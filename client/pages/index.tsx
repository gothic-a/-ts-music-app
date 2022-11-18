import type { NextPageWithLayout } from "./_app"
import { ReactElement } from "react"
import AppLayout from "../components/AppLayout"
import TrackList from "../components/TrackList"
import { wrapper } from "../store"
import { getTracksThunk } from "../store/slices/tracksSlice"

const IndexPage: NextPageWithLayout = () => {
    return <TrackList />
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const page = context.query.page ?? 1

    await store.dispatch(getTracksThunk({ page: +page }))

    return {
        props: store.getState(),
    };
});

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