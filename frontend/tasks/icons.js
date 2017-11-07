const SVGO = require('svgo')
const svgstore = require('svgstore')
const path = require('path')
const fs = require('fs')
const createLogger = require('logging').default
const logger = createLogger('Icons')

const iconPath = path.resolve('frontend/icons')
const svgo = new SVGO()
let files = fs.readdirSync(iconPath)
let sprite = svgstore()
let icons = []
let scss = ''

files.forEach(buildIcon)
storeSprite()
makeScssFile()


function buildIcon(fileName) {
  if (fileName === '.keep') { return false }
  if (fileName === '.DS_Store') { return false }
  const title = path.basename(fileName, '.svg')

  let file = fs.readFileSync(path.resolve(iconPath, fileName))
  svgo.optimize(file, result => {
    if(result.error) logger.info('Icon error '+ fileName +'.svg : ', result.error)
    else {
      icons.push(Object.assign({title}, result.info))
      sprite.add(path.parse(fileName).name, result.data)
    }
  })
}

function storeSprite () {
  const destination = path.resolve('assets/dist/icons', 'icons.svg')
  fs.writeFileSync(destination, sprite.toString())
  logger.info('Icons compiled to: ', destination)
}

function makeScssFile() {
  const destination = path.resolve('frontend/scss', 'setup', '_icons.scss')
  icons.forEach(icon => {
    scss = scss.concat(`.icon--${icon.title} { width: ${icon.width}px; height: ${icon.height}px }\n`)
  })
  fs.writeFileSync(destination, scss)
  logger.info('Icons SCSS file written at: ', destination)
}

