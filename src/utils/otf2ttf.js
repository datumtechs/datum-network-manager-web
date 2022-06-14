// const fs = require('fs')
// const path = require('path')

// 不直接在写死在package了，不然每次发布都要安装。 全局安装 npm install -g fontmin && npm link fontmini
const Fontmin = require('fontmin')

const fontSrc = './src/assets/fonts/alib/*.otf'
const fontDest = './src/assets/fonts/'
const fontmin = new Fontmin().src(fontSrc).use(Fontmin.otf2ttf()).dest(fontDest)

fontmin.run(function (err, files, stream) {
  if (err) {
    throw err
  }
  console.log(`=>>>> length:  ok`, files)
})