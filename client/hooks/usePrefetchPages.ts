import { useRouter } from "next/router"
import { useEffect } from "react"
import { Routes } from "../components/AppLayout/routes"

const usePrefetchPages= (): void => {
    const router = useRouter()

    const prefetch = (pathname: string): void => {
        for(const route of Object.values(Routes)) {
            if(route !== pathname) router.prefetch(route)
        }
    }

    useEffect(() => {
        const { pathname } = router 

        prefetch(pathname)
    }, [])
}

export default usePrefetchPages