/**
 * @description 主程序
 */
import getTemplateList from './get_template_list'
import getUserTemplateName from './get_user_template_name'
import getUserAppNameAndDestination from './get_user_app_name_and_destination'
import generateProject from './generate_project'

(async () => {
  const templateList = await getTemplateList()
  const { templateUrl, templateFramework } = await getUserTemplateName(templateList)
  const appNameAndDestination = await getUserAppNameAndDestination(templateList, templateFramework)
  await generateProject(templateUrl, appNameAndDestination)
})()
