import React, { Component, PropTypes } from 'react'

import styles from './test.css'

class Test extends Component {
    render () {
        return (
            <div id="weiqi-test" className={ styles.weiqi }>
                <h1 className={ styles.h1 }>你好，我是韦其。欢迎你来到我的世界。</h1>
                <p className={ styles.p }>对不起，我的网站正在建设中...</p>
                <p className={ styles.p }>您可以和我联系：<a className={ styles.a } href="mailto:118083659@qq.com">118083659@qq.com</a></p>
            </div>
        )
    }
}

export default Test