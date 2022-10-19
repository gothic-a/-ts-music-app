import React, { useState, useMemo, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { 
    PlayCircleOutlined,
    PlusCircleOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LikeOutlined,
    FieldTimeOutlined
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import cn from 'classnames'
import generatePalette from '../../utils/generatePalette'
import InlineLoader from '../InlineLoader'

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
        label: 'Library',
        key: '/',
        icon: <PlayCircleOutlined />
    },
    {
        label: 'Add Track',
        key: '/add-track',
        icon: <PlusCircleOutlined />
    },
    {
        label: 'Liked',
        key: '/liked',
        icon: <LikeOutlined />
    },
    {
        label: 'Recent',
        key: '/recent',
        icon: <FieldTimeOutlined />
    },
]

const { Sider, Header, Content, Footer } = Layout

const AppLayout = ({ children }: Props): JSX.Element => {
    const { pathname, push } = useRouter()
    const [layoutLoading, setLayoutLoading] = useState<boolean>(false)

    useEffect(() => {
        setLayoutLoading(false)
    }, [pathname])

    const palette = generatePalette()

    const handleMenuClick = ({ key }: { key: string }): void => {
        push(key)
        setLayoutLoading(true)
    }

    const [collapsed, setCollapsed] = useState<boolean>(false)
    const handleCollapse = (): void => setCollapsed(state => !state)

    const items: MenuItem[] = useMemo(() => menuItems.map((i: MenuItemsData) => ({
        ...i,
        label: (
            <div className="font-semibold">
                { i.label }
            </div>
        ),
    })), [])

    return (
        <Layout>
            <InlineLoader isActive={layoutLoading}/>
            <Header className={"w-screen fixed z-[100] pl-8"}>
                {
                    React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: `text-lg hover:text-[${palette[6]}] ease-in-out duration-200`,
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
                        onClick={handleMenuClick}
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
                        `fixed py-0 bottom-0 right-0 border-t-2 border-[${palette[6]}] w-screen h-16 bg-[#141414] z-1 ease duration-200`,
                        collapsed ? "pl-20" : "pl-52"
                    )}
                >
                </Footer>
            </Layout>
        </Layout>
    )
}

export default AppLayout