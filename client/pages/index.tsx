import type { NextPageWithLayout } from "./_app"
import { ReactElement } from "react"
import AppLayout from "../components/AppLayout"
import TrackList from "../components/TrackList"

const IndexPage: NextPageWithLayout = () => {
    return (
        <div>
            <TrackList />
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