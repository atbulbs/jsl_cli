const inquirer = require('inquirer')
const prompt = inquirer.createPromptModule()

export default async function getUserIsOverride () {
  const answer = await prompt([
    {
      type:'confirm',
      name:'override',
      message:'The project exists. override it?',
    }
  ])
  return answer.override
}
