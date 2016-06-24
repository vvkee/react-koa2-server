import Koa from 'koa'
import koaStatic from 'koa-static'
import react from 'koa-react-view'
import convert from 'koa-convert'

import path from 'path'

const app = new Koa()
const viewsPath = path.join(__dirname, 'views')
const staticPath = path.join(__dirname, 'public')

react(app, {
    views: viewsPath
})

// 静态模板
app.use(convert((koaStatic(path.join(__dirname, 'public')))))

app.use(async (ctx, next) => {
    ctx.render('index', {
        title: '首页',
        list: ['hello koa', 'hello react']
    })
    await next()
})
export { app }
