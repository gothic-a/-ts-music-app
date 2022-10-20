import React from "react"
import { Layout } from "antd"
import cn from 'classnames'

interface Props {
    collapsed: boolean,
    children: React.ReactNode
}

const { Content: LayoutContent } = Layout

const Content = ({ collapsed, children }: Props): JSX.Element => {
    return (
        <LayoutContent 
            className={cn(
                "my-16 py-6 px-8 ease duration-200",
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