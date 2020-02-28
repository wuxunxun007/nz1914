import request from './index'

/**
 * 加入购物车
 */
export function addCart (params) {
  const { url, data } = params
  return request.post(url, data)
}
