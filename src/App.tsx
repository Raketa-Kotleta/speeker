import MainLayout from '@/layout/main/MainLayout';
import SideSpaceViewer from './components/SideSpaceViewer';

function App() {
    return (
        <div id='app' data-theme='dark'>
            <MainLayout>
                <SideSpaceViewer className='w-90 h-full overflow-y-auto overflow-x-clip shrink-0 hidden md:block'></SideSpaceViewer>
            </MainLayout>
        </div>
    );
}

export default App;
