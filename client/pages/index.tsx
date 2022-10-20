import type { NextPageWithLayout } from "./_app"
import { ReactElement } from "react"
import AppLayout from "../components/AppLayout"
import { Typography } from "antd"

const { Title } = Typography

const IndexPage: NextPageWithLayout = () => {
    return (
        <div>
            <Title level={1}>Tracks</Title>
        </div>
    )
}

IndexPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
    return (
        <AppLayout>
            {
                page
            }
        </AppLayout>
    )
}

export default IndexPage