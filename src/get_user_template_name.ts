
const inquirer = require('inquirer')
const prompt = inquirer.createPromptModule()
/**
 * @description 获取用户选择的模板名称
 */
export default async function getUserTemplateName (templateList: Array<any>) {
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
  const template = templateList.find(template => template.name === answer.templateName)
  const templateUrl = template.url
  const templateFramework = template.framework
  return { templateUrl, templateFramework }
}
