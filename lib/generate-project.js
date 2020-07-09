const Metalsmith=require('metalsmith')
const inquirer=require('inquirer')
const chalk=require('chalk')
const path=require('path')
const ora=require('ora')
const transformIntoAbsolutePath=require('./local-path').transformIntoAbsolutePath
const _ = require('lodash')
const Handlebars = require('handlebars')
const exists = require('fs').existsSync
const rm = require('rimraf').sync

module.exports=(tmpPath,tmpName,tmpUrl)=>{
  const metalsmith=Metalsmith(tmpPath)
  inquirer.prompt([{
    type:'input',
    name:'name',
    message:'The name of project',
    default:'lc_project'
  },{
    type:'input',
    name:'appName',
    message:'The appName of project',
    validate:function(appName){
      let regex=/^[0-9a-zA-Z_]{1,}$/
      if(!regex.test(appName)){
        return '请输入由数字、英文字母或者下划线组成的字符串'
      }else{
        return true
      }
    },
    default:'newextension'
  },{
    type:'input',
    name:'destination',
    message:'The destination of project',
    default:process.cwd()
  }]).then(answer=>{
    //项目生成路径
    const destination=path.join(transformIntoAbsolutePath(answer.destination),answer.name)
    if(exists(destination)){
      rm(destination)
    }
    const spinner = ora('generating...').start()
    //加入新的全局变量
    Object.assign(metalsmith.metadata(),answer)
    spinner.start()
    metalsmith
    .source('.')
    .destination(destination)
    .clean(true)
    .use((files, metalsmith, done) => {
      Object.keys(files).forEach(fileName => { //遍历替换模板
       if (!_.startsWith(fileName, 'src/font') && !_.startsWith(fileName, 'src/assets')&& !_.startsWith(fileName, '.git') && !_.startsWith(fileName, 'static/sprite') && !_.startsWith(fileName, 'src/mock')) { //判断是否为字体文件，字体文件不用替换
        const fileContentsString = files[fileName].contents.toString() //Handlebar compile 前需要转换为字符串
        const metadataObj = metalsmith.metadata()
        metadataObj.templateName = tmpName
        if(tmpUrl){
          let repertory = tmpUrl.split('/');
          repertory = repertory[repertory.length - 1];
          metadataObj.repertory = repertory;
        }
        files[fileName].contents = new Buffer.from(Handlebars.compile(fileContentsString)(metadataObj))
       }
      })
      done()
    })
    .build(function(err,files) {  
      console.log()   
      spinner.stop()
      if (err) throw err
      console.log()
      console.log(chalk.green('Build Successfully'))
      console.log()
      console.log((`${chalk.green('Please cd')} ${destination} ${chalk.green('to start your coding')}`))
      console.log()
    })
  })
}
