import { DocumentIcon, FolderIcon } from '@heroicons/react/16/solid';
import type { MouseEventHandler, ReactNode } from 'react';
import { formatSize } from '@/utils/format';
import React from 'react';
import type SpaceElement from '@/model/SpaceElement';

export interface ISpaceElementViewerDefaultProps {
    children?: ReactNode;
    className?: string;
    element?: SpaceElement;
    sizeFormat?: 'gb' | 'mb' | 'kb';
    markerColor?: string;
    onClick?: MouseEventHandler;
}

export const SpaceElementViewerDefault = React.memo(
    ({
        className = '',
        element,
        onClick,
    }: ISpaceElementViewerDefaultProps) => {
        if (!element) return;
        const { metadata } = element;
        const icon =
            metadata.type === 'directory' ? (
                <FolderIcon className='size-4 text-yellow-400'></FolderIcon>
            ) : (
                <DocumentIcon className='size-4 text-zinc-400'></DocumentIcon>
            );
        return (
            <div className={`py-2 px-2 cursor-pointer rounded-md ${className}`} onClick={onClick}>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-3 items-center'>
                        <div className=''>{icon}</div>
                        <div>
                            <div className='text-white text-md break-all'>{metadata.name}</div>
                            <div className='mt-1 text-zinc-400 text-xs'>
                                {formatSize(metadata.size)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);
