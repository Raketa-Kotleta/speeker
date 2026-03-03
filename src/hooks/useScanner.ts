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
                },
                [],
                null,
                handle.kind
            ),
            handle: handle,
        };
    };

    async function scanDirectory(directory: FileSystemDirectoryHandle): Promise<SpaceElement> {
        const node = await createNode(directory);
        const stack = [node];
        const root: SpaceElement = node.element;
        const postProcessStack = [];
        while (stack.length) {
            const newElement = stack.pop()!;
            postProcessStack.push(newElement.element);

            for await (const entry of (newElement.handle as FileSystemDirectoryHandle).values()) {
                const hanledEntry = await createNode(entry as FileSystemDirectoryHandle);
                if (entry.kind === 'directory') {
                    stack.push(hanledEntry);
                    newElement.element.add(hanledEntry.element);
                    newElement.element.metadata.directoriesCount++;
                } else {
                    newElement.element.add(hanledEntry.element);
                    newElement.element.metadata.filesCount++;
                }
            }
        }

        for (let i = postProcessStack.length - 1; i >= 0; i--) {
            const node = postProcessStack[i];
            node.metadata.size = node.children.reduce((sum, child) => sum + child.metadata.size, 0);
        }
        
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
