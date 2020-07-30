/**
 * @description 主程序
 * @author jsl
 */
import {
  getTemplateList,
  getUserTemplateUrlAndFramework,
  getUserAppNameAndDestination,
  generateProject,
} from './helper_functions'
import { warn, info } from './utils'

(async () => {
  try {
    // 获取线上模板列表
    const templateList: Array<Template> = await getTemplateList()
    // 获取用户选择的模板
    const { templateUrl, templateFramework } = await getUserTemplateUrlAndFramework(templateList)
    // 获取用户自定义项目名称和项目路径
    const appNameAndDestination: AppNameAndDestination = await getUserAppNameAndDestination(templateFramework)
    // 生成项目
    generateProject(templateUrl, appNameAndDestination)
  } catch (e) {
    warn(e)
  } finally {
    info(`项目生成完毕,happy hacking!🥳️`)
  }
})()
