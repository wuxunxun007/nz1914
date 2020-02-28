import request from './index'

/**
 * 获取产品的详情
 */
export function getDetailData (params) {
  const { url, data } = params
  return request.get(url, {
    params: data || {}
  })
}
