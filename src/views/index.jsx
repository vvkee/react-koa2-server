import React, { Component, PropTypes } from 'react'
import ReactDOMServer from 'react-dom/server'
import addons from 'react-addons-create-fragment'

import Layout from './layout'
import JsFile from './jsFile'

class Index extends Component {
    render () {
        return (
            <Layout
                title={this.props.title}
                description={this.props.description || ''}
                keywords={this.props.keywords || ''}
                cssFiles={this.props.staticFiles.css}
            >
                <h1>{test}</h1>
                <div id="weiqi">
                    <h1>你好，我是韦其。欢迎你来到我的世界。</h1>
                    <p>对不起，我的网站正在建设中...</p>
                    <p>您可以和我联系：<a href="mailto:118083659@qq.com">118083659@qq.com</a></p>
                </div>
                {
                    this.props.staticFiles.js.map(file => <JsFile file={file} />)
                }
            </Layout>
        )
    }
}

function test() {

}

export default Index
