import { Menu, Layout } from 'antd'
import { Routes } from '../routes'
import type { MenuClickEventHandler } from 'rc-menu/lib/interface'
import { menuData } from './config'

interface SidebarProps {
    selectedKey: Routes,
    collapsed: boolean,
    onMenuClick: MenuClickEventHandler
}

const { Sider } = Layout

const Sidebar = ({ selectedKey, collapsed, onMenuClick }: SidebarProps): JSX.Element => {
    const items = menuData.map(i => ({
        ...i,
        label: (
            <div className="font-semibold">
                { i.label }
            </div>
        ),
    }))

    return (
        <Sider 
            className="pt-14 sm:pt-16 h-screen fixed w-52 z-10"
            collapsed={collapsed}
            collapsible
            collapsedWidth={80}
            trigger={null}
            width={208}
        >
            <Menu
                items={items}
                selectedKeys={[selectedKey]}
                mode="inline"
                onClick={onMenuClick}
            />
        </Sider>
    )
}

export default Sidebar