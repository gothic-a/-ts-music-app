import React from "react"
import { Layout } from "antd"
import cn from 'classnames'

interface ContentProps {
    collapsed: boolean,
    children: JSX.Element
}

const { Content: LayoutContent } = Layout

const Content = ({ collapsed, children }: ContentProps): JSX.Element => {
    return (
        <LayoutContent 
            className={cn(
                "mt-14 sm:mt-16 mb-20 py-3 px-3 sm:py-6 sm:px-8 ease duration-200 h-auto",
                collapsed ? "sm:ml-20" : "sm:ml-52",
            )}
        >
            {
                children
            }
        </LayoutContent>
    )
}

export default Content