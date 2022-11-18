const formatStatic = (path: string) => {
    const serverDomain = process.env.NEXT_PUBLIC_SERVER_DOMAIN
    return `${serverDomain}/${path}`
}

export default formatStatic