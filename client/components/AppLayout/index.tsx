import React, { useState, useMemo } from 'react'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import Link from 'next/link'
import { 
    PlayCircleOutlined,
    PlusCircleOutlined,
    ProfileOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import cn from 'classnames'

interface Props {
    children: JSX.Element
}

export interface MenuItemsData {
    label: string,
    key: string,
    icon: React.ReactElement
}

export type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItemsData[] = [
    {
        label: 'Tracks',
        key: '/',
        icon: <PlayCircleOutlined />
    },
    {
        label: 'Add Track',
        key: '/add-track',
        icon: <PlusCircleOutlined />
    },
    {
        label: 'About',
        key: '/about',
        icon: <ProfileOutlined />
    },
]

const { Sider, Header, Content, Footer } = Layout

const AppLayout = ({ children }: Props): JSX.Element => {
    const { pathname } = useRouter()

    const [collapsed, setCollapsed] = useState<boolean>(false)
    const handleCollapse = (): void => setCollapsed(state => !state)

    const items: MenuItem[] = useMemo(() => menuItems.map((i: MenuItemsData) => ({
        ...i,
        label: (
            <div className="font-semibold">
                <Link href={i.key}>{ i.label }</Link>
            </div>
        ),
    })), [])

    return (
        <Layout>
            <Header className={cn(
                "w-screen fixed z-[100] pl-8",
            )}>
                {
                    React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'text-lg hover:text-[#177ddc] ease-in-out duration-200',
                        onClick: handleCollapse
                    })
                }
            </Header>
            <Layout>
                <Sider 
                    className="pt-16 h-screen fixed w-52 z-10"
                    collapsed={collapsed}
                    collapsible
                    onCollapse={handleCollapse}
                    collapsedWidth={80}
                    trigger={null}
                    width={208}
                >
                    <Menu
                        items={items}
                        selectedKeys={[pathname]}
                        mode="inline"
                    />
                </Sider>
                <Content 
                    className={cn(
                        "my-16 py-6 px-8 ease duration-200",
                        collapsed ? `ml-20` : 'ml-52',
                    )}
                >
                    {
                        children
                    }
                </Content>
                <Footer 
                    className={cn(
                        "fixed py-0 bottom-0 right-0 border-t-2 border-[#177ddc] w-screen h-16 bg-[#141414] z-1 ease duration-200",
                        collapsed ? "pl-20" : "pl-52"
                    )}
                >
                </Footer>
            </Layout>
        </Layout>
    )
}

export default AppLayout