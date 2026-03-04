import SpaceElement from '@/model/SpaceElement';

type FileSystemHandleNode = {
    handle: FileSystemHandle;
    element: SpaceElement;
};
export default function useScanner() {
    const createNode = async (handle: FileSystemHandle): Promise<FileSystemHandleNode> => {
        return {
            element: new SpaceElement(
                {
                    creationDate: '2025-01-01',
                    filesCount: 0,
                    directoriesCount: 0,
                    name: handle.name,
                    size:
                        handle.kind === 'file'
                            ? (await (handle as FileSystemFileHandle).getFile()).size
                            : 0,
                    type: handle.kind,
                },
                [],
                null
            ),
            handle: handle,
        };
    };

    async function scanDirectory(directory: FileSystemDirectoryHandle): Promise<SpaceElement> {
        const node = await createNode(directory);
        const root: SpaceElement = node.element;

        const stack = [node];
        const postProcessStack: SpaceElement[] = [];

        while (stack.length) {
            const current = stack.pop()!;
            postProcessStack.push(current.element);
            for await (const [, entry] of (current.handle as FileSystemDirectoryHandle)) {
                const handledEntry = await createNode(entry);

                current.element.add(handledEntry.element);

                if (entry.kind === 'directory') {
                    stack.push(handledEntry);
                }
            }
        }

        for (let i = postProcessStack.length - 1; i >= 0; i--) {
            const node = postProcessStack[i];

            if (node.metadata.type === 'file') continue;

            node.metadata.size = node.children.reduce((sum, child) => sum + child.metadata.size, 0);

            node.metadata.filesCount = node.children.reduce(
                (sum, child) =>
                    sum + (child.metadata.type === 'file' ? 1 : child.metadata.filesCount),
                0
            );

            node.metadata.directoriesCount = node.children.reduce(
                (sum, child) =>
                    sum +
                    (child.metadata.type === 'file' ? 0 : child.metadata.directoriesCount + 1),
                0
            );
        }

        console.log(root);

        return root;
    }

    const selectFolder = async (): Promise<FileSystemDirectoryHandle> => {
        const root = await window.showDirectoryPicker();
        return root;
    };

    return {
        scanDirectory,
        selectFolder,
    };
}
