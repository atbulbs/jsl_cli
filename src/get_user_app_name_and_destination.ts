/**
 * @description 获取用户自定义的项目名称和路径
 */
import path from 'path'
import { prompt } from './utils'

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
  const localPath = answer.destination
  const destination = path.join(path.isAbsolute(localPath) ? localPath : path.join(process.cwd(), localPath), answer.appName)
  return { ...answer, destination }
}
