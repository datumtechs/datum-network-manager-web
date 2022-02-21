// const fs = require('fs')
// const path = require('path')

// 不直接在写死在package了，不然每次发布都要安装。 全局安装 npm install -g fontmin && npm link fontmini
const Fontmin = require('fontmin')

// const dir = './'
// const ext = 'js' // svg
const fontSrc = './src/assets/fonts/*.otf'
const fontDest = './src/assets/fonts'
const fontmin = new Fontmin().src(fontSrc).use(Fontmin.otf2ttf()).dest(fontDest)

fontmin.run(function (err, files) {
  if (err) {
    throw err
  }
  console.log(`=>>>> length:  ok`, files)
})