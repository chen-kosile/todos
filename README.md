# 在校大作业

- node &gt;=8.0.0

- 目录结构
    - app 整个应用
        - controller 控制器 用于解析用户的输入，处理后返回相应的结果 
        - service 服务 用于编写业务逻辑层 (使用model时首字母大写)。
        - extend egg框架扩展
        - middleware 中间件
        - model 用于放置领域模型
        - web 前端项目

    - config 配置文件
    - database 数据库有关文件，通过sequelize数据库初始化；

## Install

```sh
$ npm install 安装依赖
```

## Usage

npm install -g npx 安装npx
(需要修改数据库编码配置，默认是不能输入中文的，需要修改编码格式为utf8)
npx sequelize db:create 创建数据库
npx sequelize db:migrate 创建数据表
npx sequelize db:seed:all 插入必要数据

开发

```sh
$ npm run dev
$ open http://localhost:7001/
```

启动整个项目

```sh
$ npm run start
```
