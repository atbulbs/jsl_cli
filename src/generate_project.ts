import { warn, info } from './utils'
const download = require('download-git-repo')
const Metalsmith = require('metalsmith')
const handlebars = require('handlebars')
const ora = require('ora')

/**
 * @description 生成项目
 *
 */
export default function generateProject (destination, templateUrl, answer) {
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
        .metadata(answer)
        .clean(false)
        .source('.')
        .destination(destination)
        .use((files, metalsmith, done) => {
          Object.keys(files).forEach(fileName => {
            if (!/\.(jpg|png|jpeg|gif|svg|mp3|mp4|atlas)$/.test(fileName)) {
              const fileContentsString = files[fileName].contents.toString()
              const Content = Buffer.from(handlebars.compile(fileContentsString)(answer))
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