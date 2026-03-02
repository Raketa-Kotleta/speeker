import MainLayout from '@/layout/main/MainLayout';
import SideSpaceViewer from './components/SideSpaceViewer';

function App() {
    return (
        <div id='app' data-theme="dark">
            <div className='content flex flex-col h-full'>
                <MainLayout>
                    <SideSpaceViewer className='w-90 h-full'></SideSpaceViewer>
                </MainLayout>
            </div>
        </div>
    );
}

export default App;
