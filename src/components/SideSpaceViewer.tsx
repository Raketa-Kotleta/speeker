import { SpaceElementViewer } from './ui/SpaceElementViewer';
import type { ReactNode } from 'react';
import type SpaceElement from '@/model/SpaceElement';

export interface ISideSpaceViewerProps extends React.PropsWithChildren {
    className?: string;
    fileNodes?: SpaceElement;
}
export default function SideSpaceViewer({ className = '', fileNodes }: ISideSpaceViewerProps) {
    const content: ReactNode = (
        <>
            {fileNodes?.children.map(node => (
                <SpaceElementViewer element={node.metadata}></SpaceElementViewer>
            ))}
        </>
    );
    return (
        <div
            className={`dark:bg-gray-900 min-h-60 min-w-60 border-gray-700 border-r-1 ${className}`}
        >
            <div className=''>
                <div className='p-2 border-gray-700 border-b-1'>
                    <span className='text-sm text-gray-400'>
                        Подпапки
                    </span>
                </div>
                <div className="p-2">
                    {content}
                </div>
            </div>
        </div>
    );
}
