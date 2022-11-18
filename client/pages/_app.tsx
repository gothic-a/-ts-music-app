import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { wrapper } from '../store';
import 'antd/dist/antd.dark.css';
import '../styles/global.css'
import { AppState } from '../types/store';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function App({ Component, ...restProps }: AppPropsWithLayout): ReactNode {
    const getLayout = Component.getLayout ?? ((page) => page)
    const { store, props } = wrapper.useWrappedStore(restProps)

    return (
        <Provider store={store}>
            {
                getLayout(<Component {...props.pageProps} />)
            }
        </Provider>
    )
}

export default App
