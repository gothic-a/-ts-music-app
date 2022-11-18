import React from "react"
import { Layout } from "antd"
import cn from 'classnames'

interface FooterProps {
    collapsed: boolean,
    children: JSX.Element
}

const { Footer: LayoutFooter } = Layout

const Footer = ({ collapsed, children }: FooterProps): JSX.Element => {
    return (
        <LayoutFooter 
            className={cn(
                `fixed py-0 bottom-0 right-0 border-t-2 border-[#177ddc] w-screen h-20 bg-[#141414] z-1 ease duration-200`,
                collapsed ? "pl-20" : "pl-52"
            )}
        >
            {
                children
            }
        </LayoutFooter>
    )
}

export default Footer