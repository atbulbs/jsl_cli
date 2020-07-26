/**
 * @description 获取线上的模板列表
 */
import ora from 'ora'
import rpa from 'request-promise-any'
import { warn, info } from './utils'
import { templateListJsonUrl } from './constants'

const getTemplateList : GetTemplateList = async (): Promise<Array<Template>> => {
  const spinner: ora.Ora = ora('获取模板列表...').start()
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
  return JSON.parse(res) as Array<Template>
}

export default getTemplateList
