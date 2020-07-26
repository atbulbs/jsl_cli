/**
 * @description 获取用户是否覆盖之前的项目
 */
import { prompt } from './utils'

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
