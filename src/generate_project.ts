/**
 * @description 构建生成项目
 */
import download from 'download-git-repo'
import Metalsmith from 'metalsmith'
import handlebars from 'handlebars'
import ora from 'ora'
import { existsSync as exists } from 'fs'
import { sync as rm } from 'rimraf'
import { warn, info } from './utils'
import getUserIsOverride from './get_user_is_override'

const buildTempalte: GenerateProject = (templateUrl: string, appNameAndDestination: AppNameAndDestination) => {
  const { destination, appName } = appNameAndDestination
  const spinner: ora.Ora = ora('生成模板...').start()
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
          Object.keys(files).forEach((fileName: string) => {
            if (!/\.(jpg|png|jpeg|gif|svg|mp3|mp4|atlas)$/.test(fileName)) {
              const fileContentsString: string = files[fileName].contents.toString()
              const content: Buffer = Buffer.from(handlebars.compile(fileContentsString)(appNameAndDestination))
              files[fileName].contents = content.toString()
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
            info(`模板生成完毕,cd ${ appName } && happy hacking!🥳️`)
          }
        })
      } else {
        warn('下载模板失败')
        warn(err)
      }
    }
  )
}

const generateProject: GenerateProject = async (templateUrl: string, appNameAndDestination: AppNameAndDestination) => {
  const { destination } = appNameAndDestination
  if (exists(destination)) {
    if (await getUserIsOverride()) {
      rm(destination)
      buildTempalte(templateUrl, appNameAndDestination)
    }
  } else {
    buildTempalte(templateUrl, appNameAndDestination)
  }
}

export default generateProject