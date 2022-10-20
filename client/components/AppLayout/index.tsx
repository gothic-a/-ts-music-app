import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import { useRouter } from 'next/router'
import InlineLoader from '../InlineLoader'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import type { MenuInfo } from 'rc-menu/lib/interface'
import { Routes } from './routes'

interface Props {
    children: JSX.Element
}

export type HandleCollapse = () => void

const AppLayout = ({ children }: Props): JSX.Element => {
    const router = useRouter()
    const [layoutLoading, setLayoutLoading] = useState<boolean>(false)
    const [collapsed, setCollapsed] = useState<boolean>(false)

    const handleCollapse: HandleCollapse = () => setCollapsed(state => !state)
    const handleMenuClick = (props: MenuInfo): void => {
        router.push(props.key)
        setLayoutLoading(true)
    } 

    useEffect(() => {
        setLayoutLoading(false)
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
                <Footer collapsed={collapsed}/>
            </Layout>
        </Layout>
    )
}

export default AppLayout