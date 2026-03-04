import { useMainStore } from '@/store/mainStore';
import { formatSize } from '@/utils/format';

export default function MainFooter() {
    const root = useMainStore(state => state.root);
    const size: string = root ? String(formatSize(root.metadata.size)) : '—';
    const filesCount: string = root ? root.metadata.filesCount.toLocaleString() : '—';
    const directoriesCount: string = root ? root.metadata.directoriesCount.toLocaleString() : '—';
    const allElementsCount: string = root
        ? (root.metadata.directoriesCount + root.metadata.filesCount).toLocaleString()
        : '—';
    return (
        <footer className='dark:bg-zinc-900 py-1 px-4 border-zinc-700 border-t-1 text-white'>
            <div className='flex flex-col gap-2 md:flex-row md:gap-0 justify-between items-center'>
                <span className='text-xs'>
                    <span>
                        <span className='text-zinc-500'>Файлов:</span>
                        <span className='text-zinc-300 ml-1'>{filesCount}</span>
                    </span>
                    <span className='ml-4'>
                        <span className='text-zinc-500'>Папок:</span>
                        <span className='text-zinc-300 ml-1'>{directoriesCount}</span>
                    </span>
                    <span className='ml-4 hidden md:inline'>
                        <span className='text-zinc-500'>Всего</span>
                        <span className='text-zinc-300 ml-1'>{allElementsCount}</span>
                    </span>
                    <span className='ml-4'>
                        <span className='text-zinc-500'>Размер</span>
                        <span className='text-zinc-300 ml-1'>{size}</span>
                    </span>
                </span>
                <span className='text-xs text-zinc-500'>
                    Made by{' '}
                    <a
                        href='https://github.com/raketa-kotleta'
                        className='text-zinc-400'
                        target='_blank'
                    >
                        Raketa-Kotleta
                    </a>
                </span>
            </div>
        </footer>
    );
}
