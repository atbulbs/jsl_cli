/**
 * @description 获取用户选择的模板名称
 */
import { prompt } from './utils'

const getUserTemplateUrlAndFramework: GetUserTemplateUrlAndFramework = async (templateList: Array<Template>): Promise<TemplateUrlAndFramework> => {
  const choices = templateList.map(template => ({
    name: `${ template.name }, ${ template.description }`,
    value: template.name,
  }))
  const answer = await prompt([
    {
      type:'list',
      name:'templateName',
      choices,
      message:'Choose a template you want to build'
    }
  ])
  const template: Template = templateList.find(template => template.name === answer.templateName)
  const templateUrl: string = template.url
  const templateFramework: Framework = template.framework
  return { templateUrl, templateFramework } as TemplateUrlAndFramework
}

export default getUserTemplateUrlAndFramework
