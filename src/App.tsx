import MainLayout from '@/layout/main/MainLayout';
import SideSpaceViewer from './components/SideSpaceViewer';
import { SunbrustViewer } from './components/SunbrustViewer';

function App() {
    return (
        <div id='app' data-theme='dark'>
            <MainLayout>
                <div className='flex flex-1'>
                    <SideSpaceViewer className='w-90 h-full overflow-y-auto overflow-x-clip shrink-0 hidden md:block'></SideSpaceViewer>
                    <SunbrustViewer className='flex-1'></SunbrustViewer>
                </div>
            </MainLayout>
        </div>
    );
}

export default App;
