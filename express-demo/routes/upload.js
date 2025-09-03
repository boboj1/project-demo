const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const router = express.Router()

// 创建上传目录
const uploadDir = path.join(__dirname, '../public/uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// 配置 multer 存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    // 保持原文件名
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage: storage })

// 多文件上传接口
router.post('/', upload.array('files', 10), (req, res) => {
  // files 字段名，最多10个文件
  const files = req.files
  if (!files || files.length === 0) {
    return res.status(400).json({ message: '未上传文件' })
  }
  res.json({
    message: '上传成功',
    files: files.map((file) => ({
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
    })),
  })
})

module.exports = router
