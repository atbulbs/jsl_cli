/**
 * @description 获取用户选择的模板名称
 */
export default function getUserTemplateName(templateList: Array<Template>): Promise<{
    templateUrl: string;
    templateFramework: "vue" | "react" | "phaser";
}>;
