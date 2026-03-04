import type { ReactElement } from 'react';
import MainHeader from '@/layout/main/MainHeader';
import MainFooter from '@/layout/main/MainFooter';

export interface IMainLayoutProps {
    children?: ReactElement;
}
export default function MainLayout({ children }: IMainLayoutProps) {
    return (
        <div className='flex flex-col h-full'>
            <MainHeader></MainHeader>
            <div className='bg-zinc-950 flex-grow-1 flex min-h-0'>{children}</div>
            <MainFooter></MainFooter>
        </div>
    );
}
