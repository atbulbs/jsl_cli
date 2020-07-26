import { warn, info } from './utils'
import getUserIsOverride from './get_user_is_override'
const download = require('download-git-repo')
const Metalsmith = require('metalsmith')
const handlebars = require('handlebars')
const ora = require('ora')
const exists = require('fs').existsSync
const rm = require('rimraf').sync

/**
 * @description 生成项目
 *
 */
export default async function generateProject (templateUrl, appNameAndDestination) {
  const { destination } = appNameAndDestination
  console.warn('destination', destination)
  console.warn('appNameAndDestination', appNameAndDestination)
  if (exists(destination)) {
    if (await getUserIsOverride()) {
      // rm(destination as string)
      buildTempalte(templateUrl, appNameAndDestination)
    }
  } else {
    buildTempalte(templateUrl, appNameAndDestination)
  }
}

function buildTempalte (templateUrl, appNameAndDestination) {
  console.warn('templateUrl', templateUrl)
  console.warn('appNameAndDestination', appNameAndDestination)
  const { destination } = appNameAndDestination
  const spinner = ora('生成模板...').start()
  download(
    templateUrl,
    destination,
    {
      clone: true,
    },
    err => {
      if (!err) {
        Metalsmith(destination)
        .metadata(appNameAndDestination)
        .clean(false)
        .source('.')
        .destination(destination)
        .use((files, metalsmith, done) => {
          Object.keys(files).forEach(fileName => {
            if (!/\.(jpg|png|jpeg|gif|svg|mp3|mp4|atlas)$/.test(fileName)) {
              const fileContentsString = files[fileName].contents.toString()
              const Content = Buffer.from(handlebars.compile(fileContentsString)(appNameAndDestination))
              files[fileName].contents = Content.toString()
            }
          })
          done()
        })
        .build((err, files) => {
          spinner.stop()
          if (err) {
            console.warn('err', err)
            warn('生成模板失败')
            warn(err)
          } else {
            info('模板生成完毕, happy hacking!🥳️')
          }
        })
      } else {
        warn('下载模板失败')
        warn(err)
      }
    }
  )
}