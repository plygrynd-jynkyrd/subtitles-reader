const fs = require('fs');
const path = require('path');
const parser = require('subtitles-parser');
const detectCharacterEncoding = require('detect-character-encoding');

const readSubtitles = (file) => {
    const fileBuffer = fs.readFileSync(file);
    const { encoding } = detectCharacterEncoding(fileBuffer);

    const nodeEncoding = encoding === 'UTF-8' ? 'utf8' : 'latin1'

    const fileContent = fs.readFileSync(file, nodeEncoding);
    const subtitleContent = parser.fromSrt(fileContent);
    const subtitleText = subtitleContent.map((x) => x.text)

    return subtitleText
}

const isDirectory = (file) => fs.statSync(file).isDirectory()
const getFileExtension = (file) => path.extname(file).substring(1).toLowerCase()

const readSubtitlesFromDirectory = async(directory, callback) => {
    const directories = fs.readdirSync(directory);
    directories.forEach((subdirectory) => {
        const item = path.join(directory, subdirectory)
        if(isDirectory(item)) {
            readDirectory(item, callback)
        }

        if(getFileExtension(item) === 'srt'){
            const subtitles = readSubtitles(item)
            callback(item, subtitles)
        }
    })
}

module.exports = { readSubtitlesFromDirectory }

//tests
//readDirectory('./test', (content) => {
    //console.log('content', content)
//})


