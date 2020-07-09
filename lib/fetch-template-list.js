const request=require('request')
const ora=require('ora')
const chalk=require('chalk')

module.exports=(callback)=>{
  const spinner = ora('fetching template list...')
  spinner.start()
  request({
    uri:'https://github.com.cn/lc/template/lc-template-list/raw/master/%20lc-template-list.json',
    timeout:5000,
  },(err, response, body)=>{
    if(err) {
      spinner.fail(chalk.red('fetch template list unsuccessfully'))
      console.log(err)
    }
    if(response&&response.statusCode===200){
      spinner.succeed(chalk.green('fetch template list successfully'))
      callback(JSON.parse(body));
    }
  })
}
