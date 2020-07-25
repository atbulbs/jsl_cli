import { warn, info } from './utils'
import { templateListJsonUrl } from './constants'
const request = require('request')
const ora = require('ora')
const rpa = require('request-promise-any')

/**
 * @description 获取线上的模板列表
 */
export default async function getTemplateList () {
  const spinner = ora('获取模板列表...').start()
  const res = await rpa({
    uri: templateListJsonUrl,
    timeout: 5000,
  }).catch(err => {
    spinner.stop()
    warn('获取模板列表失败')
    warn(err)
  })
  spinner.stop()
  info('获取模板列表成功')
  return JSON.parse(res)
  // request(
  //   {
  //   },
  //   (err, res, body) => {
  //     spinner.stop()
  //     if (res?.statusCode === 200) {
  //       cb(JSON.parse(body))
  //     } else {
  //     }
  //   }
  // )
}
