import { generate } from "@ant-design/colors"

const generatePalette = (): Record<string, string> => {
    const colors: string[] = generate('#1890ff', {
        theme: 'dark',
        backgroundColor: '#141414'
    })

    const palette: Record<string, string> = {}

    for(let key = colors.length; key > 0; key--) {
        palette[key] = colors[key - 1]
    }

    return palette
}

export default generatePalette