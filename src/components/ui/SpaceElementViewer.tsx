import type ISpaceElementMetadata from '@/model/ISpaceElementMetadata';
import { DocumentIcon } from '@heroicons/react/16/solid';
import type { ReactNode } from 'react';
import React from 'react';

export interface ISpaceElementViewerProps {
    children?: ReactNode;
    className?: string;
    icon?: ReactNode;
    element?: ISpaceElementMetadata;
    sizeFormat?: 'gb' | 'mb' | 'kb';
    color?: string;
}

export const SpaceElementViewer = React.memo(
    ({ className = '', element, icon, color = 'sky-500' }: ISpaceElementViewerProps) => {
        if (!element) return;
        return (
            <div className={`py-2 px-2 ${className}`}>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-3 items-center'>
                        <div className=''>{icon ?? <DocumentIcon></DocumentIcon>}</div>
                        <div>
                            <div className=''>{element.name}</div>
                            <div className='mt-auto'>{element.size}</div>
                        </div>
                    </div>
                    <div className={`rounded-50 h-1 rounded-md w-10 bg-${color}`}></div>
                </div>
            </div>
        );
    }
);
