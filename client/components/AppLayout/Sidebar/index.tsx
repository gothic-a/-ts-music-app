import { Menu, Layout } from 'antd'
import type { MenuItem } from '../../../types/menu'
import { Routes } from '../routes'
import type { MenuClickEventHandler } from 'rc-menu/lib/interface'

import { 
    PlayCircleOutlined,
    PlusCircleOutlined,
    LikeOutlined,
    FieldTimeOutlined
} from '@ant-design/icons'

const menuData: MenuItem[] = [
    {
        label: 'Library',
        key: Routes.index,
        icon: <PlayCircleOutlined />
    },
    {
        label: 'Add Track',
        key: Routes.addTrack,
        icon: <PlusCircleOutlined />
    },
    {
        label: 'Liked',
        key: Routes.liked,
        icon: <LikeOutlined />
    },
    {
        label: 'Recent',
        key: Routes.recent,
        icon: <FieldTimeOutlined />
    },
]

interface Props {
    selectedKey: Routes,
    collapsed: boolean,
    onMenuClick: MenuClickEventHandler
}

const { Sider } = Layout

const Sidebar = ({ selectedKey, collapsed, onMenuClick }: Props): JSX.Element => {
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
            className="pt-16 h-screen fixed w-52 z-10"
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