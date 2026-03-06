import Button from '@/components/ui/Button';
import useScanner from '@/hooks/useScanner';
import type SpaceElement from '@/model/SpaceElement';
import { useMainStore } from '@/store/mainStore';
import { FolderIcon } from '@heroicons/react/16/solid';
import { useCallback, type MouseEventHandler } from 'react';

export default function MainHeader() {
    const { scan } = useScanner();
    const currentElement = useMainStore(state => state.current);
    const setCurrent = useMainStore(state => state.setCurrent);
    
    const getAllParents = useCallback(() => {
        const elements: SpaceElement[] = [];
        let current = currentElement?.parent;
        while (current) {
            elements.push(current);
            current = current?.parent;
        }

        return elements;
    }, [currentElement]);

    const setRoot = useMainStore(state => state.setRoot);

    const onOpenFolderClick: MouseEventHandler = async () => {
        const element = await scan();
        setRoot(element);
    };

    return (
        <header className='dark:bg-zinc-900 py-3 px-4 border-zinc-700 border-b-1 text-white'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-3 items-center'>
                    <span className='text-lg uppercase tracking-widest text-blue-800 font-bold'>speeker</span>
                    <div className='flex gap-2 items-center text-xs'>
                        {getAllParents()
                            .reverse()
                            .map(node => (
                                <div
                                    className='flex gap-2 items-center text-zinc-400'
                                    onClick={() => setCurrent(node)}
                                >
                                    <span className='cursor-pointer'>{node.metadata.name}</span>
                                    <span>{'>'}</span>
                                </div>
                            ))}
                        <div className=' text-zinc-100'>
                            <span>{currentElement?.metadata.name}</span>
                        </div>
                    </div>
                </div>
                <nav className='mx-3 list-none gap-3 flex'>
                    <li>
                        <Button
                            className='bg-sky-700 hover:bg-sky-600 border-none'
                            onClick={onOpenFolderClick}
                        >
                            <FolderIcon className='size-4 text-yellow-400 inline'></FolderIcon>
                            <span className='align-middle ml-1'>Открыть папку</span>
                        </Button>
                    </li>
                </nav>
            </div>
        </header>
    );
}
