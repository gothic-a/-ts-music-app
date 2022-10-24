const getAudioDuration = (path: string): Promise<number> => {
    return new Promise((res, rej) => {
        const audio = new Audio(path)
        audio.addEventListener('loadedmetadata', (event) => {
            res(audio.duration)
        })
    })
}

export default getAudioDuration
