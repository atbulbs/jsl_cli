[前端工程化]手摸手👬从零打造自己的cli

> 都`0202`了, 你还没有属于自己的`cli`么, 初始化项目时还是用`CV`大法加上缝缝补补么, 本文将手摸手渐进式的迭代开发属于自己的`cli`, 解放你的生产力

## 以终为始
最终实现的效果如下
![](https://user-gold-cdn.xitu.io/2020/7/26/1738890fd5c291cb?w=854&h=230&f=gif&s=5157949)

最终实现的功能如下


最终的主程序代码如下
```TypeScript
/**
 * @description 主程序
 * @author jsl
 */

import {
  getTemplateList,
  getUserTemplateUrlAndFramework,
  getUserAppNameAndDestination,
  generateProject,
} from './helper_functions'

(async () => {
  // 获取线上模板列表
  const templateList: Array<Template> = await getTemplateList()
  // 获取用户选择的模板
  const { templateUrl, templateFramework } = await getUserTemplateUrlAndFramework(templateList)
  // 获取用户自定义项目名称和项目路径
  const appNameAndDestination: AppNameAndDestination = await getUserAppNameAndDestination(templateFramework)
  // 生成项目
  await generateProject(templateUrl, appNameAndDestination)
})()

```


## 整体思路
独立维护模板项目和命令行工具项目, 收集解析用户输入, 下载相应模板, 并按需求对模板进行定制, 最终在用户本地生成项目

![](https://user-gold-cdn.xitu.io/2020/7/22/173765a3ce6c4481?w=966&h=494&f=png&s=88449)

## step1: 实现mvp版本, 通过命令行下载模板项目
起手式开局初始化一个空项目
```bash
$ npm init -y
```

在`package.json`里配置`bin`
```js
"bin": {
    "jsl": "bin/jsl",
    "jsl-create": "bin/create"
  },
```

`bin/jsl`代码, 其中`#!/usr/bin/env node` 指定当前脚本由node.js进行解析
```js
#!/usr/bin/env node
require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('create', 'generate project')
  .parse(process.argv)
```
`bin/create`代码, 其中`download-git-repo`可下载准备好的模板项目, 项目名我们暂时硬编码为`my_app`
```js
#!/usr/bin/env node
const download = require('download-git-repo')
download(
  'direct:https://github.com/atbulbs/phaser_template.git',
  'my_app',
  {
    clone: true,
  },
  err => {
    console.warn(err ? err : 'success')
  }
)
```
在当前目录建立软链接, 当前目录里的模块和相应命令会被链接到全局, 便于我们测试

![](https://user-gold-cdn.xitu.io/2020/7/22/173768c5f5b933cf?w=2282&h=632&f=png&s=121166)
相应的解除软链接方法
```bash
$ npm unlink
```
此时可运行

![](https://user-gold-cdn.xitu.io/2020/7/22/173766b2f3582eda?w=910&h=490&f=png&s=56606)
然后就可以运行我们的`mvp`版本的`cli`了

![](https://user-gold-cdn.xitu.io/2020/7/22/173766de34a66d79?w=940&h=138&f=png&s=15813)
一番等待后, `duang~`, 就可以看到我们生成的模板项目了

![](https://user-gold-cdn.xitu.io/2020/7/22/173768b782cd9b76?w=916&h=128&f=png&s=17533)
![](https://user-gold-cdn.xitu.io/2020/7/22/173766cf8c852243?w=542&h=1080&f=png&s=78596)

## step2: 发布自己的cli到npm
在`npm`官网注册账号, 然后在本地登录

![](https://user-gold-cdn.xitu.io/2020/7/22/17376726d3e4bb45?w=1218&h=504&f=png&s=54019)

可用`npm version`维护修订版本, 次要版本, 主版本的版本号
```
// version = v1.0.0
npm version patch
// v1.0.1
npm version minor
// v1.1.0
npm version major
// v2.0.0
```
然后就可以愉快的发版了

![](https://user-gold-cdn.xitu.io/2020/7/22/1737682e499c5a5e?w=1400&h=1004&f=png&s=204244)

这样你的小伙伴就可以使用你的`cli`了

## step3: 实现用户自定义文件名和文件目录
此时可使用`inquirer`实现命令行交互, 获取用户自定义的项目文件名和文件目录地址, 处理用户输入的绝对地址, 处理该文件目录已存在的情况, 询问是否覆盖原目录
```javascript
#!/usr/bin/env node

const path=require('path')
const exists = require('fs').existsSync
const inquirer = require('inquirer')
const download = require('download-git-repo')
const rm = require('rimraf').sync

function generateProject (destination) {
  download(
    'direct:https://github.com/atbulbs/phaser_template.git',
    destination,
    {
      clone: true,
    },
    err => {
      console.warn(err ? err : 'success!')
    }
  )
}

inquirer
  .prompt([
    {
      type: 'input',
      name: 'appName',
      message: 'The name of project',
      default: 'my_app',
    },
    {
      type: 'input',
      name: 'destination',
      message: 'The destination of project',
      default: process.cwd()
    }
  ])
  .then(answer => {
    const localPath = answer.destination
    //项目生成路径
    const destination = path.join(path.isAbsolute(localPath) ? localPath : path.join(process.cwd(), localPath), answer.appName)
    if (exists(destination)) {
      inquirer.prompt([
        {
          type:'confirm',
          name:'override',
          message:'The project exists. override it?',
        }
      ]).then(answer=>{
        if (answer.override) {
          rm(destination)
          generateProject(destination)
        }
      })
    } else {
      generateProject(destination)
    }
})
```

![](https://user-gold-cdn.xitu.io/2020/7/22/17376c30ad9b1990?w=976&h=152&f=png&s=25210)

![](https://user-gold-cdn.xitu.io/2020/7/22/17376c3898110abe?w=1316&h=182&f=png&s=37627)

# step4: 提供多种模板供用户选择
提供一个模板列表, 让用户自由选择, 构建自己想要的模板项目, 使用`inquirer`的`list`
```
#!/usr/bin/env node

const path=require('path')
const exists = require('fs').existsSync
const inquirer = require('inquirer')
const download = require('download-git-repo')
const rm = require('rimraf').sync

const templateList = [
  {
    name: 'a vue template',
    url: 'direct:https://github.com/atbulbs/vue_template.git',
    description: 'for h5 project, using vw adjust, build all in typscript includes webpack configuration',
    framework: 'vue',
  },
  {
    name: 'a phaser template',
    url: 'direct:https://github.com/atbulbs/phaser_template.git',
    description: 'build all in typscript includes webpack configuration',
    framework: 'phaser',
  }
]

function generateProject (destination, url) {
  download(
    url,
    destination,
    {
      clone: true,
    },
    err => {
      console.warn(err ? err : 'success!')
    }
  )
}

const choices = templateList.map(template => ({
  name: `${ template.name }, ${ template.description }`,
  value: template.name,
}))

inquirer
  .prompt([
    {
      type:'list',
      name:'templateName',
      choices,
      message:'Choose a template you want to build'
    }
  ]).then(answer => {
    const template = templateList.find(template => template.name === answer.templateName)
    const templateUrl = template.url
    const templateFramework = template.framework
    console.warn('templateUrl', templateUrl)
    inquirer
      .prompt([
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
      .then(answer => {
        const localPath = answer.destination
        //项目生成路径
        const destination = path.join(path.isAbsolute(localPath) ? localPath : path.join(process.cwd(), localPath), answer.appName)
        if (exists(destination)) {
          inquirer.prompt([
            {
              type:'confirm',
              name:'override',
              message:'The project exists. override it?',
            }
          ]).then(answer=>{
            if (answer.override) {
              rm(destination)
              generateProject(destination, templateUrl)
            }
          })
        } else {
          generateProject(destination, templateUrl)
        }
    })
  })

```
效果如下

![](https://user-gold-cdn.xitu.io/2020/7/24/1737ebad1e99dc23?w=640&h=139&f=gif&s=1710164)

# step5: 实现从线上获取模板列表
之前的模板列表是我们在`cli`里硬编码的, 如果需要改动模板列表数据, 则需要发布新的`cli`版本, 我们可以将模板列表数据放到线上, 目前`github`不支持查看原始文件, 所以我们将模板列表数据放到`gitlab`上

![](https://user-gold-cdn.xitu.io/2020/7/24/1737ee2d85f85b9a?w=2104&h=522&f=png&s=107218)

然后就可以使用线上动态的模板数据了
```JavaScript

#!/usr/bin/env node

const path=require('path')
const exists = require('fs').existsSync
const inquirer = require('inquirer')
const download = require('download-git-repo')
const rm = require('rimraf').sync
const request = require('request')

const templateListJsonUrl = 'https://gitlab.com/8bulbs/template-json/-/raw/master/list.json'
request(
  {
    uri: templateListJsonUrl,
    timeout: 5000,
  },
  (err, res, body) => {
    if (err) {
      console.err(err)
    }
    if (res && res.statusCode === 200) {
      const templateList = JSON.parse(body)
      const choices = templateList.map(template => ({
        name: `${ template.name }, ${ template.description }`,
        value: template.name,
      }))
      inquirer
        .prompt([
          {
            type:'list',
            name:'templateName',
            choices,
            message:'Choose a template you want to build'
          }
        ])
        .then(answer => {
          const template = templateList.find(template => template.name === answer.templateName)
          const templateUrl = template.url
          const templateFramework = template.framework
          console.warn('templateUrl', templateUrl)
          inquirer
            .prompt([
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
            .then(answer => {
              const localPath = answer.destination
              const destination = path.join(path.isAbsolute(localPath) ? localPath : path.join(process.cwd(), localPath), answer.appName)
              if (exists(destination)) {
                inquirer.prompt([
                  {
                    type:'confirm',
                    name:'override',
                    message:'The project exists. override it?',
                  }
                ]).then(answer=>{
                  if (answer.override) {
                    rm(destination)
                    generateProject(destination, templateUrl)
                  }
                })
              } else {
                generateProject(destination, templateUrl)
              }
            })
        })
    }
  }
)

function generateProject (destination, url) {
  download(
    url,
    destination,
    {
      clone: true,
    },
    err => {
      console.warn(err ? err : 'success!')
    }
  )
}

```

# step6: 定制模板数据
我们可以根据用户的输入修改目标模板的相关内容,  在此我们利用静态网站生成器`metalsmith`和模板引擎`handlebars`, 利用模板引擎的插值语法并用自定义变量占位, 如`package.json`的`name`值将更新为用户输入的`appName`
```javascript
"name": "{{appName}}",
```

```javascript
#!/usr/bin/env node

const path=require('path')
const exists = require('fs').existsSync
const inquirer = require('inquirer')
const download = require('download-git-repo')
const rm = require('rimraf').sync
const request = require('request')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')

const templateListJsonUrl = 'https://gitee.com/atbulbs/template_json/raw/master/list.json'
request(
  {
    uri: templateListJsonUrl,
    timeout: 5000,
  },
  (err, res, body) => {
    if (err) {
      console.warn(err)
    }
    if (res && res.statusCode === 200) {
      const templateList = JSON.parse(body)
      const choices = templateList.map(template => ({
        name: `${ template.name }, ${ template.description }`,
        value: template.name,
      }))
      inquirer
        .prompt([
          {
            type:'list',
            name:'templateName',
            choices,
            message:'Choose a template you want to build'
          }
        ])
        .then(answer => {
          const template = templateList.find(template => template.name === answer.templateName)
          const templateUrl = template.url
          const templateFramework = template.framework
          inquirer
            .prompt([
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
            .then(answer => {
              const localPath = answer.destination
              const destination = path.join(path.isAbsolute(localPath) ? localPath : path.join(process.cwd(), localPath), answer.appName)
              if (exists(destination)) {
                inquirer.prompt([
                  {
                    type:'confirm',
                    name:'override',
                    message:'The project exists. override it?',
                  }
                ]).then(_answer=>{
                  if (_answer.override) {
                    rm(destination)
                    generateProject(destination, templateUrl, answer)
                  }
                })
              } else {
                generateProject(destination, templateUrl, answer)
              }
            })
        })
    }
  }
)

function generateProject (destination, templateUrl, answer) {
  download(
    templateUrl,
    destination,
    {
      clone: true,
    },
    err => {
      console.warn(err ? err : 'success!')
      if (!err) {
        Metalsmith(destination)
        .metadata(answer)
        .clean(false)
        .source('.')
        .destination(destination)
        .use((files, metalsmith, done) => {
          Object.keys(files).forEach(fileName => {
            if (/\.(json|js|ts|jsx|tsx|vue)$/.test(fileName)) {
              const fileContentsString = files[fileName].contents.toString()
              files[fileName].contents = new Buffer.from(Handlebars.compile(fileContentsString)(answer))
            }
          })
          done()
        })
        .build(function(err,files) {
          if (err) {
            throw err
          } else {
            console.warn('build success!')
          }
        })
      }
    }
  )
}

```

# step7: 装修我们的命令行用户界面
作为一个画UI写交互的有追求页面仔, 我们当然希望界面有更好的体验, 我们可以利用`ora`展示`loading`, 利用`chalk`展示彩色字体
```javascript
#!/usr/bin/env node

const path=require('path')
const exists = require('fs').existsSync
const inquirer = require('inquirer')
const download = require('download-git-repo')
const rm = require('rimraf').sync
const request = require('request')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const ora = require('ora')
const chalk = new require('chalk').constructor({ enabled: true })
const warn = str => console.log(chalk.red(str))
const info = str => console.log(chalk.blue(str))

const templateListJsonUrl = 'https://gitee.com/atbulbs/template_json/raw/master/list.json'
const spinner = ora('获取模板列表...').start()
request(
  {
    uri: templateListJsonUrl,
    timeout: 5000,
  },
  (err, res, body) => {
    spinner.stop()
    if (err) {
      warn('获取模板列表失败')
      warn(err)
    }
    if (res && res.statusCode === 200) {
      info('获取模板列表成功')
      const templateList = JSON.parse(body)
      const choices = templateList.map(template => ({
        name: `${ template.name }, ${ template.description }`,
        value: template.name,
      }))
      inquirer
        .prompt([
          {
            type:'list',
            name:'templateName',
            choices,
            message:'Choose a template you want to build'
          }
        ])
        .then(answer => {
          const template = templateList.find(template => template.name === answer.templateName)
          const templateUrl = template.url
          const templateFramework = template.framework
          inquirer
            .prompt([
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
            .then(answer => {
              const localPath = answer.destination
              const destination = path.join(path.isAbsolute(localPath) ? localPath : path.join(process.cwd(), localPath), answer.appName)
              if (exists(destination)) {
                inquirer.prompt([
                  {
                    type:'confirm',
                    name:'override',
                    message:'The project exists. override it?',
                  }
                ]).then(_answer=>{
                  if (_answer.override) {
                    rm(destination)
                    generateProject(destination, templateUrl, answer)
                  }
                })
              } else {
                generateProject(destination, templateUrl, answer)
              }
            })
        })
    }
  }
)

function generateProject (destination, templateUrl, answer) {
  const spinner = ora('生成模板...').start()
  download(
    templateUrl,
    destination,
    {
      clone: true,
    },
    err => {
      if (!err) {
        Metalsmith(destination)
        .metadata(answer)
        .clean(false)
        .source('.')
        .destination(destination)
        .use((files, metalsmith, done) => {
          Object.keys(files).forEach(fileName => {
            if (/\.(json|js|ts|jsx|tsx|vue)$/.test(fileName)) {
              const fileContentsString = files[fileName].contents.toString()
              files[fileName].contents = new Buffer.from(Handlebars.compile(fileContentsString)(answer))
            }
          })
          done()
        })
        .build((err, files) => {
          spinner.stop()
          if (err) {
            console.warn('err', err)
            warn('生成模板失败')
            warn(err)
          } else {
            info('模板生成完毕, happy hacking!🥳️')
          }
        })
      } else {
        warn('下载模板失败')
        warn(err)
      }
    }
  )
}

```

![](https://user-gold-cdn.xitu.io/2020/7/26/1738887bb0db5462?w=854&h=230&f=gif&s=4437120)

# setp8: 用模块化重构项目
目前我们的项目代码已经比较复杂, 为了便于后期的维护与扩展, 可以用`rollup`或者`webpack`和`typeScript`对项目进行重构, 主要是拆分模块和异步编程解决回调层级太深以及实现定义与实现分类的面向接口编程, 其中`bin/create`可以引入构建工具打包好的产物
```
#!/usr/bin/env node

require('../lib/create.umd.js')

```
源码目录结构
```bash
src
├── constants.ts # 常量定义, 模板列表线上地址
├── generate_project.ts # 构建生成项目
├── get_template_list.ts # 获取线上的模板列表
├── get_user_app_name_and_destination.ts # 获取用户自定义的项目名称和路径
├── get_user_is_override.ts # 获取用户是否覆盖之前的项目
├── get_user_template_url_and_framework.ts # 获取用户选择的模板名称
├── helper_functions.ts # 主程序的辅助函数
├── main.ts # 主程序
├── types.d.ts # 类型定义
└── utils.ts # 工具类, 粉笔字体, 获取用户输入的信息
```
先看类型定义
`types.d.ts`
```typescript
/**
 * @description 类型定义
 */

declare type Framework = 'vue' | 'react' | 'phaser'

declare type Template = {
  name: string
  url: string
  description: string
  framework: Framework
}

declare type AppNameAndDestination = {
  appName: string
  destination: string
}

declare type TemplateUrlAndFramework = {
  templateUrl: string
  templateFramework: Framework
}

interface GenerateProject {
  (templateUrl: string, appNameAndDestination: AppNameAndDestination): Promise<any>
}

interface GetTemplateList {
  (): Promise<Array<Template>>
}

interface GetUserAppNameAndDestination {
  (templateFramework: string): Promise<AppNameAndDestination>
}

interface GetUserIsOverride {
  (): Promise<boolean>
}

interface GetUserTemplateUrlAndFramework {
  (templateList: Array<Template>): Promise<TemplateUrlAndFramework>
}

interface Log {
  (str: string): void
}

```
再看主程序
`main.ts`
```typescript
/**
 * @description 主程序
 * @author jsl
 */

import {
  getTemplateList,
  getUserTemplateUrlAndFramework,
  getUserAppNameAndDestination,
  generateProject,
} from './helper_functions'

(async () => {
  // 获取线上模板列表
  const templateList: Array<Template> = await getTemplateList()
  // 获取用户选择的模板
  const { templateUrl, templateFramework } = await getUserTemplateUrlAndFramework(templateList)
  // 获取用户自定义项目名称和项目路径
  const appNameAndDestination: AppNameAndDestination = await getUserAppNameAndDestination(templateFramework)
  // 生成项目
  await generateProject(templateUrl, appNameAndDestination)
})()

```
然后看辅助函数
`helper_functions.ts`
```typescript
/**
 * @description 主程序的辅助函数
 */
export { default as getTemplateList } from './get_template_list'
export { default as getUserTemplateUrlAndFramework } from './get_user_template_url_and_framework'
export { default as getUserAppNameAndDestination } from './get_user_app_name_and_destination'
export { default as generateProject } from './generate_project'

```

`constants.ts`
```typescript
/**
 * @description 常量定义, 模板列表线上地址
 */
export const templateListJsonUrl = 'https://gitee.com/atbulbs/template_json/raw/master/list.json'

```
`generate_project.ts`
```typescript
/**
 * @description 构建生成项目
 */
import download from 'download-git-repo'
import Metalsmith from 'metalsmith'
import handlebars from 'handlebars'
import ora from 'ora'
import { existsSync as exists } from 'fs'
import { sync as rm } from 'rimraf'
import { warn, info } from './utils'
import getUserIsOverride from './get_user_is_override'

const buildTempalte: GenerateProject = async (templateUrl: string, appNameAndDestination: AppNameAndDestination): Promise<any> => {
  const { destination, appName } = appNameAndDestination
  const spinner: ora.Ora = ora('生成模板...').start()
  download(
    templateUrl,
    destination,
    {
      clone: true,
    },
    err => {
      if (!err) {
        Metalsmith(destination)
        .metadata(appNameAndDestination)
        .clean(false)
        .source('.')
        .destination(destination)
        .use((files, metalsmith, done) => {
          Object.keys(files).forEach((fileName: string) => {
            if (/\.(json|js|ts|jsx|tsx|vue)$/.test(fileName)) {
              const fileContentsString: string = files[fileName].contents.toString()
              const content: Buffer = Buffer.from(handlebars.compile(fileContentsString)(appNameAndDestination))
              files[fileName].contents = content.toString()
            }
          })
          done()
        })
        .build((err, files) => {
          spinner.stop()
          if (err) {
            console.warn('err', err)
            warn('生成模板失败')
            warn(err)
          } else {
            info(`模板生成完毕,cd ${ appName } && happy hacking!🥳️`)
          }
        })
      } else {
        warn('下载模板失败')
        warn(err)
      }
    }
  )
}

const generateProject: GenerateProject = async (templateUrl: string, appNameAndDestination: AppNameAndDestination): Promise<any> => {
  const { destination } = appNameAndDestination
  if (exists(destination)) {
    if (await getUserIsOverride()) {
      rm(destination)
      buildTempalte(templateUrl, appNameAndDestination)
    }
  } else {
    buildTempalte(templateUrl, appNameAndDestination)
  }
}

export default generateProject

```
`get_template_list.ts`
```typescript
/**
 * @description 获取线上的模板列表
 */
import ora from 'ora'
import rpa from 'request-promise-any'
import { warn, info } from './utils'
import { templateListJsonUrl } from './constants'

const getTemplateList : GetTemplateList = async (): Promise<Array<Template>> => {
  const spinner: ora.Ora = ora('获取模板列表...').start()
  const res = await rpa({
    uri: templateListJsonUrl,
    timeout: 5000,
  }).catch(err => {
    spinner.stop()
    warn('获取模板列表失败')
    warn(err)
  })
  spinner.stop()
  info('获取模板列表成功!')
  return JSON.parse(res) as Array<Template>
}

export default getTemplateList


```
`get_user_app_name_and_destination.ts`
```typescript
/**
 * @description 获取用户自定义的项目名称和路径
 */
import path from 'path'
import { prompt } from './utils'

const getUserAppNameAndDestination: GetUserAppNameAndDestination = async (templateFramework: string): Promise<AppNameAndDestination> => {
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
  return { ...answer, destination } as AppNameAndDestination
}

export default getUserAppNameAndDestination

```
`get_user_is_override.ts`
```typescript
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

```
`get_user_template_url_and_framework.ts`
```typescript
/**
 * @description 获取用户选择的模板名称
 */
import { prompt } from './utils'

const getUserTemplateUrlAndFramework: GetUserTemplateUrlAndFramework = async (templateList: Array<Template>): Promise<TemplateUrlAndFramework> => {
  const choices = templateList.map(template => ({
    name: `${ template.name }, ${ template.description }`,
    value: template.name,
  }))
  const answer = await prompt([
    {
      type:'list',
      name:'templateName',
      choices,
      message:'Choose a template you want to build'
    }
  ])
  const template: Template = templateList.find(template => template.name === answer.templateName)
  const templateUrl: string = template.url
  const templateFramework: Framework = template.framework
  return { templateUrl, templateFramework } as TemplateUrlAndFramework
}

export default getUserTemplateUrlAndFramework

```

`utils.ts`
```typescript
/**
 * @description 工具类, 粉笔字体, 获取用户输入的信息
 */
import chalk from 'chalk'
import inquirer from 'inquirer'

export const warn: Log = (str: string): void => console.log(chalk.red(str))
export const info: Log = (str: string): void => console.log(chalk.blue(str))

export const prompt = inquirer.createPromptModule()

```

该项目代码仓库: [https://github.com/atbulbs/jsl_cli](https://github.com/atbulbs/jsl_cli)



