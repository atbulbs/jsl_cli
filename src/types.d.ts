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
  (templateUrl: string, appNameAndDestination: AppNameAndDestination): void
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