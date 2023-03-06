//管理启动环境
const isDev = process.env.NODE_ENV === 'development';
const isPrd = process.env.NODE_ENV === 'production';

module.exports = {
  isDev,
  isPrd
}