module.exports = {
  success: (data) => ({
    code: 0,
    data,
  }),
  error: (message) => ({
    code: 500,
    message,
  }),
}
