import type { ReactElement } from "react"
import MainHeader from "@/layout/main/MainHeader"
import MainFooter from "@/layout/main/MainFooter"

export interface IMainLayoutProps {
    children?: ReactElement
}
export default function MainLayout({ children } : IMainLayoutProps) {
    return <>
        <MainHeader></MainHeader>
            <div className="bg-gray-950 flex-1">
                {children}
            </div>
        <MainFooter></MainFooter>
    </>
}