const inquirer = require('inquirer')
const prompt = inquirer.createPromptModule()

export default async function getUserAppNameAndDestination (templateList, templateFramework) {
  const answer = await prompt([
    {
      type: 'input',
      name: 'appName',
      message: 'The name of project',
      default: `my_${ templateFramework }_app`,
    },
    {
      type: 'input',
      name: 'destination',
      message: 'The destination of project',
      default: process.cwd()
    }
  ])
  return answer
}
