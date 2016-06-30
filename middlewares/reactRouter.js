import { match, RouterContext } from 'react-router'
import routes from '../routes'
export default async (ctx, next) => {
    const requestUrl = ctx.req.url
    await match({
        routes,
        location: requestUrl
    }, async (err, redirectLocation, renderProps) => {
        
        if (err) {
            ctx.res.status = 500
            ctx.res.send(error.message)
        } else if (redirectLocation) {
            ctx.res.redirect(302, `${ redirectLocation.pathname }${ redirectLocation.search }`)
        } else if (renderProps) {
            const staticFiles = await ctx.renderStaticFile('test')
            ctx.res.status = 200
            ctx.render('test', {
                title: '韦宗圻-weizongqi-韦其-weiqi-Web前端-专注前端领域实践开发',
                description: '韦宗圻（又名韦其），专注于web前端技术领域实践。对web技术有着灵敏的嗅觉，致力于国内外web新技术试行者。',
                keywords: '韦宗圻、weizongqi、韦其、weiqi、前端、web前端、前端工程师、js、css',
                staticFiles: staticFiles,
                renderProps: renderProps
            })
        } else {
            ctx.res.status = 404
        }
    })
}
