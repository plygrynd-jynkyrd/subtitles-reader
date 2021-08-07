# subtitles-reader

- Installation: `npm i subtitles-reader`
- Usage:
```js
const { readSubtitlesFromDirectory } = require('subtitles-reader')

readSubtitlesFromDirectory('./subtitles', (filename, subtitles) => {
    console.log('subtitles file path ' + filename)
    console.log('subtitles from the current file: ' + subtitles)
})
```

### Features
- Read files from nested directories.
- Auto detect file encoding.