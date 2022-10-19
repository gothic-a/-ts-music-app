import type { NextPageWithLayout } from "../_app"
import { ReactElement } from "react"
import AppLayout from "../../components/AppLayout"
import { Typography } from "antd"

const { Title } = Typography

const AddTrackPage: NextPageWithLayout = (): JSX.Element => {
    return (
        <div>
            <Title level={1}>Add Track</Title>
        </div>
    )
}

AddTrackPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
    return (
        <AppLayout>
            {
                page
            }
        </AppLayout>
    )
}

export default AddTrackPage