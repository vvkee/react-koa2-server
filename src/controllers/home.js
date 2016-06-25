export default {
    index: async (ctx, next) => {
        ctx.render('index', {
            title: '首页',
            list: ['hello koa', 'hello react']
        })
        await next()
    }
}
