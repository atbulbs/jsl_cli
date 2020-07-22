/**
 * @description 初始化game实例
 */
import Phaser from 'phaser'

import {
  LoadScene,
  HomeScene,
} from './scenes'

import '../plugins/SpinePlugin.min.js'
require('../plugins/rextagtext.3.17.0.min.js')

import { resolution } from './shared/constants'

export class Game extends Phaser.Game {

  private _currentSceneName: string = ''

  constructor (config: Phaser.Types.Core.GameConfig) {
    super(config)
  }

  public get currentSceneName (): string {
    return this._currentSceneName
  }

  public set currentSceneName (sceneName: string) {
    this._currentSceneName = sceneName
  }

  public getCurrentScene (): Phaser.Scene {
    return this.scene.getScene(this._currentSceneName)
  }

}

export default function initPhaserGame () {
  const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    width: window.innerWidth,
    height: window.innerHeight,
    resolution,
    autoFocus: true,
    transparent: true,
    plugins: {
      scene: [
        {
          key: 'SpinePlugin',
          plugin: window['SpinePlugin'],
          mapping: 'spine'
        }
      ]
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
  }
  const game: Phaser.Game = new Game(gameConfig)
  window.__phaser_game__ = game
  game.scene.add('LoadScene', LoadScene, true)
  game.scene.add('HomeScene', HomeScene)
}
