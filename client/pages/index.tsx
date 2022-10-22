import type { NextPageWithLayout } from "./_app"
import { ReactElement } from "react"
import AppLayout from "../components/AppLayout"

const IndexPage: NextPageWithLayout = () => {
    return (
        <div>
            
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