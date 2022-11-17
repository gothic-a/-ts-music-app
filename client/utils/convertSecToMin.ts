interface Options {
    label?: boolean
}

const convertSecToMin = (seconds: number, options?: Options): string => {
    const minutes = new Date(seconds * 1000).toISOString().substr(14, 5)

    const label = options?.label ? 'm' : ''

    return `${minutes}${label}`
}

export default convertSecToMin