const fs = require('fs')
const path = require('path')
const Fontmin = require('fontmin')

const fontSrc = './src/assets/fonts/dol/*.ttf'
const fontDest = './src/assets/fonts/ALBNewFonts'
const dir = './'
const ext = 'ts,js,tsx,jsx,json'
const excludeDir = ['node_modules', '.nuxt', '.git', '.svn', 'config']
const chineseData = []
const fileExtReg = new RegExp(`\\.(${ext.replace(/,/g, '|')})$`, 'i')


function walk(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err)
      }
      Promise.all(
        files.map(file => {
          return new Promise((resolve, reject) => {
            const filePath = path.join(dir, file)
            fs.stat(filePath, (err, stats) => {
              if (err) throw err
              if (stats.isDirectory() && !excludeDir.includes(file)) {
                walk(filePath).then(resolve)
              } else if (stats.isFile() && fileExtReg.test(file)) {
                fs.readFile(filePath, 'utf8', (err, data) => {
                  if (err) {
                    reject(err)
                  }
                  const arr = data.match(/[^\x00-\x7F]+/g)
                  arr && chineseData.push(...arr)
                  resolve()
                })
              } else {
                resolve()
              }
            })
          })
        })
      ).then(resolve)
    })
  })
}

const fontmin = new Fontmin().src(fontSrc).dest(fontDest)

walk(dir).then(() => {
  const baseChars = `1234567890-= !@#$%^&*()_+（）。、；·~ \`~qwertyuiop[]\\QWERTYUIOP{}|asdfghjkl;' ASDFGHJKL:"zxcvbnm,./ ZXCVBNM<>?`
  let text = baseChars + chineseData.join()
  text = Array.from(new Set(text.split(''))).join()
  console.log('all chars: ', text)
  fontmin.use(
    Fontmin.glyph({
      text,
      trim: false
    })
  )
  fontmin.run((err, files) => {
    if (err) {
      throw err
    }
  })
})
