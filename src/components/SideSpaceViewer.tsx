import { SpaceElementViewer } from './ui/SpaceElementViewer';
import { type ReactNode } from 'react';
import { useMainStore } from '@/store/mainStore';
import SpaceElement from '@/model/SpaceElement';
import ColorUtils from '@/utils/colors';
import { SpaceElementViewerDefault } from './ui/SpaceElementViewerDefault';

export interface ISideSpaceViewerProps extends React.PropsWithChildren {
    className?: string;
}
export default function SideSpaceViewer({ className = '' }: ISideSpaceViewerProps) {
    const element = useMainStore(state => state.current);
    const setCurrent = useMainStore(state => state.setCurrent);

    const returnBackElement = new SpaceElement(
        {
            directoriesCount: 0,
            filesCount: 0,
            name: '. .',
            size: 0,
            type: 'directory',
            creationDate: '',
        },
        [],
        null
    );

    const content: ReactNode = (
        <div>
            {element?.parent && (
                <SpaceElementViewerDefault
                    element={returnBackElement}
                    key={returnBackElement.metadata.name}
                    className='hover:bg-zinc-800'
                    onClick={() => setCurrent(element?.parent ?? element)}
                ></SpaceElementViewerDefault>
            )}
            {element?.children.map(child => (
                <SpaceElementViewer
                    element={child}
                    key={child.metadata.name}
                    className='hover:bg-zinc-800'
                    onClick={() => setCurrent(child)}
                    markerColor={ColorUtils.getColor(
                        child.parent?.children.indexOf(child) ?? 1,
                        child.parent?.children.length ?? 1
                    )}
                ></SpaceElementViewer>
            ))}
        </div>
    );
    return (
        <div
            className={`dark:bg-zinc-900 min-h-60 min-w-60 border-zinc-700 border-r-1 ${className}`}
        >
            <div>
                <div className='p-2 border-zinc-700 border-b-1'>
                    <span className='text-sm text-zinc-400'>Подпапки</span>
                </div>
                <div className='p-2'>{content}</div>
            </div>
        </div>
    );
}
