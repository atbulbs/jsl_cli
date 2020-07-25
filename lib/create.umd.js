(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var chalk = require('chalk');
    var warn = function (str) { return console.log(chalk.red(str)); };
    var info = function (str) { return console.log(chalk.blue(str)); };

    /**
     * @description 模板列表线上地址
     */
    var templateListJsonUrl = 'https://gitee.com/atbulbs/template_json/raw/master/list.json';

    var request = require('request');
    var ora = require('ora');
    var rpa = require('request-promise-any');
    /**
     * @description 获取线上的模板列表
     */
    function getTemplateList() {
        return __awaiter(this, void 0, void 0, function () {
            var spinner, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spinner = ora('获取模板列表...').start();
                        return [4 /*yield*/, rpa({
                                uri: templateListJsonUrl,
                                timeout: 5000,
                            })["catch"](function (err) {
                                spinner.stop();
                                warn('获取模板列表失败');
                                warn(err);
                            })];
                    case 1:
                        res = _a.sent();
                        spinner.stop();
                        info('获取模板列表成功');
                        return [2 /*return*/, JSON.parse(res)
                            // request(
                            //   {
                            //   },
                            //   (err, res, body) => {
                            //     spinner.stop()
                            //     if (res?.statusCode === 200) {
                            //       cb(JSON.parse(body))
                            //     } else {
                            //     }
                            //   }
                            // )
                        ];
                }
            });
        });
    }

    var inquirer = require('inquirer');
    var prompt = inquirer.createPromptModule();
    /**
     * @description 获取用户选择的模板名称
     */
    function getUserTemplateName(templateList) {
        return __awaiter(this, void 0, void 0, function () {
            var choices, answer, template, templateUrl, templateFramework;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        choices = templateList.map(function (template) { return ({
                            name: template.name + ", " + template.description,
                            value: template.name,
                        }); });
                        return [4 /*yield*/, prompt([
                                {
                                    type: 'list',
                                    name: 'templateName',
                                    choices: choices,
                                    message: 'Choose a template you want to build'
                                }
                            ])];
                    case 1:
                        answer = _a.sent();
                        template = templateList.find(function (template) { return template.name === answer.templateName; });
                        templateUrl = template.url;
                        templateFramework = template.framework;
                        return [2 /*return*/, { templateUrl: templateUrl, templateFramework: templateFramework }];
                }
            });
        });
    }

    // import generateProject from './generate_project'
    // const path = require('path')
    // const exists = require('fs').existsSync
    // const inquirer = require('inquirer')
    // const rm = require('rimraf').sync
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var templateList, _a, templateUrl, templateFramework;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getTemplateList()];
                case 1:
                    templateList = _b.sent();
                    console.warn('templateList', templateList);
                    return [4 /*yield*/, getUserTemplateName(templateList)];
                case 2:
                    _a = _b.sent(), templateUrl = _a.templateUrl, templateFramework = _a.templateFramework;
                    console.warn('templateUrl', templateUrl);
                    console.warn('templateFramework', templateFramework);
                    return [2 /*return*/];
            }
        });
    }); })();
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

})));
//# sourceMappingURL=create.umd.js.map
