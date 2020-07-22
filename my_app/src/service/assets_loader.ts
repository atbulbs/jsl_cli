/**
 * @description 资源加载服务
 */

export default class AssetsLoader {

  handleComplete = () => {}
  handleProgress = (e) => {}

  constructor (private scene) {
    this.scene.load.crossOrigin = 'anonymous'
  }

  /**
   * @description 加载报告资源
   */
  public loadReportAssets (data, imagesConfig = {}, soundsConfig = {}, spritesConfig = {}) {
    // 网络图片
    const netImages = []
    // 网络音频
    const netSounds = []
    const wordsNew = data.wordsNew as Array<any>
    const wordsReview = data.wordsReview as Array<any>
    [... wordsNew, ... wordsReview].forEach(word => {
      netImages.push(word.image)
      netSounds.push(word.sound)
    })
    this.load(netImages, netSounds, imagesConfig, soundsConfig, spritesConfig)
  }

  public loadLessonAssets (data, imagesConfig = {}, soundsConfig = {}, spritesConfig = {}) {
    // 网络图片
    const netImages = []
    // 网络音频
    const netSounds = []
    const wordsList = data.wordsList as Array<any>
    [...wordsList].forEach(word => {
      netImages.push(word.image)
      netSounds.push(word.sound)
    })
    this.load(netImages, netSounds, imagesConfig, soundsConfig, spritesConfig)
  }

  public loadBookAssets (data, imagesConfig = {}, soundsConfig = {}, spritesConfig = {}) {
    // 网络图片
    const netImages = []

    const bookList = data as Array<any>
    [...bookList].forEach(word => {
      netImages.push(word.image)
    })
    this.load(netImages, [], imagesConfig, soundsConfig, spritesConfig)
  }

  /**
   * @description 加载模板资源
   */
  public loadTemplateAssets (data, imagesConfig = {}, soundsConfig = {}, spritesConfig = {}) {
    // 网络图片
    const netImages = []
    // 网络音频
    const netSounds = []
    data.questionList.forEach(question => {
      const { questionTag } = question
      if (questionTag === 'newWord') {
        netImages.push(question.image)
        netSounds.push(question.sound)
      } else if (questionTag === 'STA03') {
        question.selections.forEach(item => {
          netImages.push(item.image)
        })
        netSounds.push(question.sound)
      } else if (questionTag === 'STH05') {
        netImages.push(question.image)
        netSounds.push(question.sound)
      } else if (questionTag === 'WTD01' || 'WTD02') {
        netImages.push(question.image)
        netSounds.push(question.sound)
      } else if (questionTag === 'STA01') {
        if (question.image) {
          netImages.push(question.image)
        }
        if (question.sound) {
          netSounds.push(question.sound)
        }
      }
    })
    this.load(netImages, netSounds, imagesConfig, soundsConfig, spritesConfig)
  }

  /**
   * @description 加载默认资源
   */
  public loadDefaultAssets (imagesConfig, soundsConfig, spritesConfig) {
    this.load([], [], imagesConfig, soundsConfig, spritesConfig)
  }

  // 加载
  public load (netImages, netSounds = [], imagesConfig = {}, soundsConfig = {}, spritesConfig = {}) {
    netImages.forEach(image => {
      if (image.match(/\.(jpg|png|jpeg|gif|svg)/)) {
        imagesConfig[image] = image
      }
    })
    netSounds.forEach(sound => {
      if (sound.match(/\.mp3/)) {
        soundsConfig[sound] = sound
      }
    })
    const assetsHash = {
      image: imagesConfig,
      audio: soundsConfig,
      multiatlas: spritesConfig,
    }
    Object.keys(assetsHash).forEach(assetsType => {
      const assets = assetsHash[assetsType]
      Object.keys(assets).forEach(key => {
        this.scene.load[assetsType](key, assets[key])
      })
    })
    this.scene.load.start()
    this.scene.load.on('progress', e => {
      this.handleProgress(e)
    })
    this.scene.load.once('complete', () => {
      this.handleComplete()
    })
  }

  public onceComplete (handleComplete = () => {}) {
    this.handleComplete = handleComplete
  }

  public onProgress (handleProgress = (e) => {}) {
    this.handleProgress = handleProgress
  }

}
