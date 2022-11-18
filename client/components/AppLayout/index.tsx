import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import Router, { useRouter } from 'next/router'
import InlineLoader from '../InlineLoader'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import type { MenuInfo } from 'rc-menu/lib/interface'
import { Routes } from './routes'
import Player from '../Player'

interface AppLayoutProps {
    children: JSX.Element
}

export type HandleCollapse = () => void

const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
    const router = useRouter()
    const [layoutLoading, setLayoutLoading] = useState<boolean>(false)
    const [collapsed, setCollapsed] = useState<boolean>(false)

    const startLoading = (): void => setLayoutLoading(true);
    const stopLoading = (): void => setLayoutLoading(false);

    const handleCollapse: HandleCollapse = () => setCollapsed(state => !state)
    const handleMenuClick = (props: MenuInfo): void => {
        if(router.pathname === props.key) return 

        router.push(props.key)
    } 

    useEffect(() => {
        Router.events.on('routeChangeStart', startLoading); 
        Router.events.on('routeChangeComplete', stopLoading);

        return () => {
            Router.events.off('routeChangeStart', startLoading);
            Router.events.off('routeChangeComplete', stopLoading);
        }
    }, [router.pathname])

    return (
        <Layout>
            <InlineLoader isActive={layoutLoading}/>
            <Header 
                collapsed={collapsed}
                handleCollapse={handleCollapse}
            />
            <Layout>
                <Sidebar 
                    collapsed={collapsed}
                    selectedKey={router.pathname as Routes}
                    onMenuClick={handleMenuClick}
                />
                <Content collapsed={collapsed}>
                    {
                        children
                    }
                </Content>
                <Footer collapsed={collapsed}>
                    <Player />
                </Footer>
            </Layout>
        </Layout>
    )
}

export default AppLayout