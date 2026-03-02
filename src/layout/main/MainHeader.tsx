import Button from '@/components/ui/Button';

export default function MainHeader() {
    return (
        <header className='dark:bg-gray-900 py-3 px-4 border-gray-700 border-b-1 text-white'>
            <div className='flex justify-between items-center'>
                <span className='text-lg uppercase tracking-widest'>speeker</span>
                <nav className='mx-3 list-none gap-3 flex'>
                    <li>
                        <Button className='bg-sky-700 hover:bg-sky-600 border-none'>
                            📂 Открыть папку
                        </Button>
                    </li>
                </nav>
            </div>
        </header>
    );
}
