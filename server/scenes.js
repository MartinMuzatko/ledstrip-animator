// load and save scenes as JSON
const path = require('path')
const fs = require('fs-extra')

const SCENES_PATH = path.resolve(__dirname, './scenes')

const get = (filepath) => fs.readJSON(path.join(SCENES_PATH, filepath))
const set = (filepath, config) => fs.writeJSON(path.join(SCENES_PATH, filepath), config)
const list = () => fs.readdir(SCENES_PATH)

module.exports = {
    SCENES_PATH,
    get,
    set,
    list,
}

