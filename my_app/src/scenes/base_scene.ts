/**
 * @description 基础场景
 */
import $ from '../service/http'
import AssetsLoader from '../service/assets_loader'

import Graphics = Phaser.GameObjects.Graphics
import Image = Phaser.GameObjects.Image
import Text = Phaser.GameObjects.Text
import Container = Phaser.GameObjects.Container

import { designWidth, designHeight, resolution } from '../shared/constants'
const designRatio = designWidth / designHeight

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
console.warn('screenWidth', screenWidth)
console.warn('screenHeight', screenHeight)

// 是否过渡入场
let isTransitionIn = true
// 是否过渡出场
let isTransitionOut = false

export default class BaseScene extends Phaser.Scene {

  // 适配缩放比例
  protected zoom: number
  protected backgroundRectX: number = 0
  protected backgroundRectY: number = 0
  protected viewRatio
  protected contentRect: Phaser.Geom.Rectangle
  protected backgroundRect: Phaser.Geom.Rectangle
  protected $ = $
  protected assetsLoader: AssetsLoader
  // 背景坐标与尺寸
  public background = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
  }
  protected navigator = {
    /**
     * @跳转路由， 切换场景
     * @param nextSceneName 下一个场景的名称
     * @param data 传递给下一个场景的数据
     */
    push (nextSceneName: string, data?) {}
  }
  protected intervalId = 0
  protected intervalMemory = {}

  constructor (sceneName: string, private isDebug = false) {

    super({ key: sceneName })

  }

  /**
   * @description 子类会自动执行此create声明周期, private 禁止子类覆写
   */
  private create () {
    this.sound.pauseOnBlur = false
    this.fitScreen()
    this.initNavigator()
    this.assetsLoader = new AssetsLoader(this)
    this.build()
    this.events.on('destroy', this.dispose, this)
  }

  /**
   * @description 构建UI
   */
  build () {
  }

  /**
   * @description 适配屏幕
   */
  protected fitScreen () {
    this.viewRatio = screenWidth / screenHeight
    let scrollX = 0
    let scrollY = 0
    // 根据设计稿的宽高比与视口的宽高比判断缩放的基准
    if (designRatio > this.viewRatio) {
      console.warn('以宽为基准做缩放, 内容区域在垂直方向中间, 水平方向占满屏幕')
      this.zoom = screenWidth / designWidth
      const left = 0
      const right = designWidth
      const top = -(screenHeight / this.zoom - designHeight) / 2
      const bottom = top  + screenHeight / this.zoom
      this.background = {
        top,
        right,
        bottom,
        left,
        width: designWidth,
        height: screenHeight / this.zoom,
      }
      scrollY = -(screenHeight - this.zoom * designHeight) / 2
    } else {
      console.warn('以高为基准做缩放, 内容区域在水平方向中间, 垂直方向占满屏幕')
      this.zoom = screenHeight / designHeight
      const top = 0
      const bottom = designHeight
      const left = -(screenWidth / this.zoom - designWidth) / 2
      const right = left + screenWidth
      this.background = {
        top,
        right,
        bottom,
        left,
        width: screenWidth / this.zoom,
        height: designHeight,
      }
      scrollX = -(screenWidth - this.zoom * designWidth) / 2 / this.zoom
    }

    this.cameras.main.setOrigin(0, 0)
    this.cameras.main.setScroll(scrollX, scrollY)
    this.cameras.main.setSize(screenWidth * resolution, screenHeight * resolution)
    this.cameras.main.setZoom(this.zoom * resolution)

    if (designRatio > this.viewRatio) {
      this.buildBackgroundRect()
      this.buildContentRect()
    } else {
      this.buildBackgroundRect()
      this.buildContentRect()
    }
  }

  /**
   * @description 初始化导航
   */
  private initNavigator () {
    this.events.on('transitionstart', (fromScene, duration) => {
      // console.warn('transitionstart')
      if (isTransitionIn) {
        this.cameras.main.x = screenWidth * resolution
        this.tweens.add({
          targets: this.cameras.main,
          x: 0,
          y: 0,
          duration: 500,
        })
      }
    })
    this.events.on('transitionout', (toScene, duration) => {
      if (isTransitionOut) {
        this.tweens.add({
          targets: this.cameras.main,
          x: screenWidth * resolution,
          y: 0,
          duration: 500,
          onCompleteScope: this,
          onComplete: () => {
            this.dispose()
          }
        })
      }
    })
    /**
     * @跳转路由， 切换场景
     * @param nextSceneName 下一个场景的名称
     * @param data 传递给下一个场景的数据
     */
    this.navigator.push = (nextSceneName, data = {}) => {
      window.__current_scene_name__ = nextSceneName
      console.warn('push nextSceneName', nextSceneName)
      isTransitionIn = data.isNextSceneTransitionIn ?? true
      isTransitionOut = data.isCurrentSceneTransitonOut ?? false
      this.scene.transition({
        // 下一个场景的key
        target: nextSceneName,
        // 是否在下面移动
        moveBelow: false,
        // 过渡时间
        duration: 550,
        // 传递给下一个场景的数据
        data,
      })
    }
  }

  /**
   * @description 构建内容区域矩形
   */
  protected buildContentRect () {
    if (this.isDebug) {
      const contentRectGraphics = this.add.graphics({ lineStyle: { color: 0x0000ff, width: 5 } })
      contentRectGraphics.strokeRect(0, 0, designWidth, designHeight)
      contentRectGraphics.setDepth(10)
    }
  }

  /**
   * @description 构建背景区域矩形
   */
  protected buildBackgroundRect () {
    if (this.isDebug) {
      const backgroundRectGraphics = this.add.graphics({ lineStyle: { color: 0xff0000, width: 5 } })
      backgroundRectGraphics.strokeRect(this.background.left, this.background.top, screenWidth / this.zoom, screenHeight / this.zoom)
      backgroundRectGraphics.setDepth(10)
    }
  }

  /**
   * @description 场景销毁时自动调用
   */
  protected dispose () {

  }

}
