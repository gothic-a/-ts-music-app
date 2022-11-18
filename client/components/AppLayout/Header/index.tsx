import React from "react"
import { Layout } from "antd"
import { 
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons'

interface HeaderProps {
    collapsed: boolean,
    handleCollapse: () => void
}

const { Header: LayoutHeader } = Layout

const Header = ({ collapsed, handleCollapse }: HeaderProps): JSX.Element => {
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

export default React.memo(Header)