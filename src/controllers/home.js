export default {
    index: async (ctx, next) => {
        const staticFiles = await ctx.renderStaticFile('index')
        ctx.render('index', {
            title: '韦宗圻-weizongqi-韦其-weiqi-Web前端-专注前端领域实践开发',
            description: '韦宗圻（又名韦其），专注于web前端技术领域实践。对web技术有着灵敏的嗅觉，致力于国内外web新技术试行者。',
            keywords: '韦宗圻、weizongqi、韦其、weiqi、前端、web前端、前端工程师、js、css',
            staticFiles: staticFiles
        })
        await next()
    }
}
