import React from "react"
import { Layout } from "antd"
import { 
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons'
import type { HandleCollapse } from '../'

interface Props {
    collapsed: boolean,
    handleCollapse: HandleCollapse
}

const { Header: LayoutHeader } = Layout

const Header = ({ collapsed, handleCollapse }: Props): JSX.Element => {
    return (
        <LayoutHeader className="h-14 sm:h-16 w-screen fixed z-[100] pl-8">
            {
                React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: `text-lg hover:text-[#177ddc] ease-in-out duration-200 inline-flex`,
                    onClick: handleCollapse
                })
            }
        </LayoutHeader>
    )
}

export default Header