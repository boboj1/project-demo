const Koa = require('koa')
const cors = require('@koa/cors')
const { koaBody } = require('koa-body')
const serve = require('koa-static') // 新增：用于静态资源服务
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')

// 初始化Koa应用
const app = new Koa()
const PORT = process.env.PORT || 3000

// 配置静态资源目录 - public目录可以通过URL直接访问
// 例如：http://localhost:3000/imgs/xxx.jpg 访问 public/imgs/xxx.jpg
app.use(serve(path.join(__dirname, 'public')))

// 上传目录改为 public/imgs
const UPLOAD_DIR = path.join(__dirname, 'public', 'imgs')
// 确保上传目录存在，如果不存在则创建
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

// 允许的文件类型（仅图片类型）
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif']

// 文件大小限制 (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024

// 中间件配置
app.use(cors()) // 处理跨域
app.use(
  koaBody({
    multipart: true, // 允许上传多部分表单数据
    formidable: {
      uploadDir: UPLOAD_DIR, // 上传目录
      keepExtensions: true, // 保留文件扩展名
      maxFileSize: MAX_FILE_SIZE, // 文件大小限制
      onFileBegin: (name, file) => {
        // 检查文件类型是否允许
        // if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        //   // 标记为无效文件
        //   file.invalid = true
        //   file.error = new Error(`不支持的文件类型: ${file.type}，仅支持JPG、PNG、GIF`)
        // }
      },
      onError: (err) => {
        console.error('文件上传错误:', err)
      },
    },
  })
)

// 根路由 - 用于测试服务器是否运行
app.use(async (ctx, next) => {
  if (ctx.path === '/' && ctx.method === 'GET') {
    ctx.body = {
      message: 'Koa文件上传服务器运行中',
      endpoints: {
        '/upload/single': '单文件上传 (POST)',
        '/upload/multiple': '多文件上传 (POST)',
      },
      note: '上传的图片保存在public/imgs目录，可以通过 http://localhost:3000/imgs/文件名 访问',
    }
    return
  }
  await next()
})

// 单文件上传接口
app.use(async (ctx, next) => {
  if (ctx.path === '/upload/single' && ctx.method === 'POST') {
    const file = ctx.request.files?.file

    // 检查是否有文件
    if (!file) {
      ctx.status = 400
      ctx.body = {
        success: false,
        message: '请选择要上传的文件',
      }
      return
    }

    // 检查文件是否有效
    if (file.invalid) {
      // 删除临时文件
      fs.unlinkSync(file.filepath)

      ctx.status = 400
      ctx.body = {
        success: false,
        message: file.error.message,
      }
      return
    }

    try {
      // 生成唯一文件名
      const ext = path.extname(file.originalFilename)
      const newFilename = `${uuidv4()}${ext}`
      const newPath = path.join(UPLOAD_DIR, newFilename)

      // 重命名文件（从临时名改为我们生成的文件名）
      fs.renameSync(file.filepath, newPath)

      // 计算图片访问URL
      const imageUrl = `/imgs/${newFilename}`

      ctx.body = {
        success: true,
        message: '文件上传成功',
        data: {
          originalName: file.originalFilename,
          filename: newFilename,
          size: file.size,
          type: file.type,
          path: newPath,
          url: imageUrl, // 新增：返回可访问的URL
          fullUrl: `http://localhost:${PORT}${imageUrl}`, // 新增：完整访问URL
        },
      }
    } catch (error) {
      console.error('文件处理错误:', error)
      ctx.status = 500
      ctx.body = {
        success: false,
        message: '文件上传失败',
      }
    }
    return
  }
  await next()
})

// 多文件上传接口
app.use(async (ctx, next) => {
  if (ctx.path === '/upload/multiple' && ctx.method === 'POST') {
    const files = ctx.request.files?.files

    // 检查是否有文件
    if (!files) {
      ctx.status = 400
      ctx.body = {
        success: false,
        message: '请选择要上传的文件',
      }
      return
    }

    // 确保files是数组（处理单文件情况）
    const fileArray = Array.isArray(files) ? files : [files]
    const results = []
    let hasError = false

    // 处理每个文件
    for (const file of fileArray) {
      // 检查文件是否有效
      if (file.invalid) {
        // 删除临时文件
        fs.unlinkSync(file.filepath)

        results.push({
          originalName: file.originalFilename,
          success: false,
          message: file.error.message,
        })
        hasError = true
        continue
      }

      try {
        // 生成唯一文件名
        const ext = path.extname(file.originalFilename)
        const newFilename = `${uuidv4()}${ext}`
        const newPath = path.join(UPLOAD_DIR, newFilename)

        // 重命名文件
        fs.renameSync(file.filepath, newPath)

        // 计算图片访问URL
        const imageUrl = `/imgs/${newFilename}`

        results.push({
          originalName: file.originalFilename,
          filename: newFilename,
          size: file.size,
          type: file.type,
          url: imageUrl, // 新增：返回可访问的URL
          fullUrl: `http://localhost:${PORT}${imageUrl}`, // 新增：完整访问URL
          success: true,
          message: '文件上传成功',
        })
      } catch (error) {
        console.error('文件处理错误:', error)
        results.push({
          originalName: file.originalFilename,
          success: false,
          message: '文件上传失败',
        })
        hasError = true
      }
    }

    ctx.status = hasError ? 400 : 200
    ctx.body = {
      success: !hasError,
      message: hasError ? '部分文件上传失败' : '所有文件上传成功',
      data: results,
    }
    return
  }
  await next()
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`Koa服务器已启动，监听端口 ${PORT}`)
  console.log(`上传目录: ${UPLOAD_DIR}`)
  console.log(`静态资源可通过 http://localhost:${PORT}/ 访问`)
  console.log(`例如：上传的图片可通过 http://localhost:${PORT}/imgs/文件名 访问`)
})
