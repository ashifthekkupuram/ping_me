import { fileURLToPath } from 'url'
import { dirname } from 'path'

const getDirName = (metaUrl) => {
    const _filename = fileURLToPath(metaUrl)
    return dirname(_filename)
}

export default getDirName