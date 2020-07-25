/**
 * @description 主程序
 */
import getTemplateList from './get_template_list'
import getUserTemplateName from './get_user_template_name'
// import generateProject from './generate_project'
// const path = require('path')
// const exists = require('fs').existsSync
// const inquirer = require('inquirer')
// const rm = require('rimraf').sync

(async () => {
  const templateList = await getTemplateList()
  console.warn('templateList', templateList)
  const { templateUrl, templateFramework } = await getUserTemplateName(templateList)
  console.warn('templateUrl', templateUrl)
  console.warn('templateFramework', templateFramework)
  
})()

// getTemplateList(templateList => {
//   console.warn('templateList', templateList)
//   getUserTemplateName(templateList, (templateUrl, templateFramework) => {
//     console.warn('templateUrl', templateUrl)
//     console.warn('templateFramework', templateFramework)
//     inquirer
//       .prompt([
//         {
//           type: 'input',
//           name: 'appName',
//           message: 'The name of project',
//           default: `my_${ templateFramework }_app`,
//         },
//         {
//           type: 'input',
//           name: 'destination',
//           message: 'The destination of project',
//           default: process.cwd()
//         }
//       ])
//       .then(answer => {
//         const localPath = answer.destination
//         const destination = path.join(path.isAbsolute(localPath) ? localPath : path.join(process.cwd(), localPath), answer.appName)
//         if (exists(destination)) {
//           inquirer.prompt([
//             {
//               type:'confirm',
//               name:'override',
//               message:'The project exists. override it?',
//             }
//           ]).then(_answer=>{
//             if (_answer.override) {
//               rm(destination)
//               generateProject(destination, templateUrl, answer)
//             }
//           })
//         } else {
//           generateProject(destination, templateUrl, answer)
//         }
//       })
//   })

// })
