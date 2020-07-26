/**
 * @description 获取用户是否覆盖之前的项目
 */
import { prompt } from './utils'

const getUserIsOverride: GetUserIsOverride = async (): Promise<boolean> => {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'override',
      message: 'The project exists. override it?',
    }
  ])
  return answer.override as boolean

}
export default getUserIsOverride