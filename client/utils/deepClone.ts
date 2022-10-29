const JSONClone = <T>(object: T): T  => {
    return JSON.parse(JSON.stringify(object))
}

export default JSONClone