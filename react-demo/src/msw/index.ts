import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'

export const worker = setupWorker(
  http.get('/api/userInfo', ({ request, params, cookies }) => {
    return HttpResponse.json({
      code: 0,
      message: '获取用户信息成功',
      data: {
        userName: 'John Doe',
        age: 30,
      },
    })
  })
)
