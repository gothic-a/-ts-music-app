import React from "react"
import AppLayout from "../../components/AppLayout"
import { NextPageWithLayout } from "../_app"
import { Typography } from "antd"

const { Title } = Typography

const AboutPage: NextPageWithLayout = (): JSX.Element => {
    return (
        <div>
            <Title level={1}>About</Title>
        </div>
    )
}

AboutPage.getLayout = function(page: React.ReactElement): JSX.Element {
    return (
        <AppLayout>
            {
                page
            }
        </AppLayout>
    )
}

export default AboutPage