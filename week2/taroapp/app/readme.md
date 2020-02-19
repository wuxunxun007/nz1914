# 1.安装脚手架
```
# 使用 npm 安装 CLI
$ npm install -g @tarojs/cli
# OR 使用 yarn 安装 CLI
$ yarn global add @tarojs/cli
# OR 安装了 cnpm，使用 cnpm 安装 CLI
$ cnpm install -g @tarojs/cli
```

# 2.创建项目
```
taro init myApp

**不建议在此处使用 npx 创建**
```

# 3.运行项目

## 3.1 运行到浏览器端
```
npm run dev:h5

npm run build:h5
```

## 3.2 运行微信小程序
```
npm run dev:weapp

npm run build:weapp
```