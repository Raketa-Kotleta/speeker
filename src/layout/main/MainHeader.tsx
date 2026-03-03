import Button from '@/components/ui/Button';
import useScanner from '@/hooks/useScanner';
import { useMainStore } from '@/store/mainStore';
import type { MouseEventHandler } from 'react';

export default function MainHeader() {
    const { selectFolder, scanDirectory } = useScanner();
    const setRoot = useMainStore(state => state.setRoot);
    
    const onOpenFolderClick: MouseEventHandler = async () => {
        const element = await scanDirectory(await selectFolder());
        setRoot(element);
    }

    return (
        <header className='dark:bg-gray-900 py-3 px-4 border-gray-700 border-b-1 text-white'>
            <div className='flex justify-between items-center'>
                <span className='text-lg uppercase tracking-widest'>speeker</span>
                <nav className='mx-3 list-none gap-3 flex'>
                    <li>
                        <Button
                            className='bg-sky-700 hover:bg-sky-600 border-none'
                            onClick={onOpenFolderClick}
                        >
                            📂 Открыть папку
                        </Button>
                    </li>
                </nav>
            </div>
        </header>
    );
}
