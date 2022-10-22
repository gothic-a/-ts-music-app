import React from "react"
import { Layout } from "antd"
import cn from 'classnames'

interface Props {
    collapsed: boolean,
    children: JSX.Element
}

const { Content: LayoutContent } = Layout

const Content = ({ collapsed, children }: Props): JSX.Element => {
    return (
        <LayoutContent 
            className={cn(
                "mt-14 sm:mt-16 mb-20 py-3 px-3 sm:py-6 sm:px-8 ease duration-200",
                collapsed ? `ml-20` : 'ml-52',
            )}
        >
            {
                children
            }
        </LayoutContent>
    )
}

export default Content