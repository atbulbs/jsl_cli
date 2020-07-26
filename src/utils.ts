/**
 * @description 工具类, 粉笔字体, 获取用户输入的信息
 */
import chalk from 'chalk'
import inquirer from 'inquirer'

export const warn: Function = (str: string) => console.log(chalk.red(str))
export const info: Function = (str: string) => console.log(chalk.blue(str))

export const prompt = inquirer.createPromptModule()
