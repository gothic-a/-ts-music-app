import React, { useState, useEffect, useCallback } from 'react'
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
import usePrefetchPages from '../../hooks/usePrefetchPages'

interface AppLayoutProps {
    children: JSX.Element
}

const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
    const router = useRouter()
    const [layoutLoading, setLayoutLoading] = useState<boolean>(false)
    const [collapsed, setCollapsed] = useState<boolean>(false)

    usePrefetchPages()

    const startLoading = (): void => setLayoutLoading(true);
    const stopLoading = (): void => setLayoutLoading(false);

    const handleCollapse = useCallback(() => setCollapsed(state => !state), [])
    const handleMenuClick = useCallback((props: MenuInfo): void => {
        if(router.pathname === props.key) return 
        router.push(props.key)
    }, [router])

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