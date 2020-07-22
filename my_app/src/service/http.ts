/**
 * @description 调用接口服务
 */

import axios from 'axios'

const prefix = ''

const $ = (url, params?, type = 'get') => {
  url = prefix + url
  if (type === 'post') {
    return axios.post(url, params)
  } else if (type === 'post_query') {
    url += '?'
    const keys = Object.keys(params)
    keys.forEach((key, index) => {
      url += `${ key }=${ params[key] }${ index === keys.length - 1 ? '' : '&' }`
    })
    return axios.post(url, params)
  } else {
    return axios.get(url, { params: params })
  }
}

export default $
