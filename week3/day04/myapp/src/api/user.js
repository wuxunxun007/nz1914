import request from './index'

/**
 * 登陆操作
 */
export function login (params) {
  const { url, data } = params
  return request.post(url, data)
}
