const chalk = require('chalk')
export const warn = str => console.log(chalk.red(str))
export const info = str => console.log(chalk.blue(str))
