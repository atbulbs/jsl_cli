/**
 * @description 获取线上的模板列表
 */
import ora from 'ora'
import rpa from 'request-promise-any'
import { warn, info } from './utils'
import { templateListJsonUrl } from './constants'

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
  info('获取模板列表成功!')
  return JSON.parse(res)
}
