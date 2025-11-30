module.exports = {
  // 使用 jsdom 模擬瀏覽器環境 (DOM, window, document)
  testEnvironment: 'jsdom',
  
  // 忽略備份目錄
  testPathIgnorePatterns: [
    '/node_modules/',
    '/v1/',
    '/v2/'
  ],
  
  // 測試文件位置
  roots: ['<rootDir>'],
  
  // 測試文件匹配模式
  testMatch: [
    '**/__tests__/**/*.+(js)',
    '**/?(*.)+(spec|test).+(js)'
  ],
  
  // 顯示詳細報告
  verbose: true
};
