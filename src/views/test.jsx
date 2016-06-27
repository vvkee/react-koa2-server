import React, { Component, PropTypes } from 'react'
import ReactDOMServer from 'react-dom/server'

import Layout from './layout'

class Index extends Component {

    render () {
        return (
            <Layout title={this.props.string}>
                <h1>{test}</h1>
                <div id="content" dangerouslySetInnerHTML={{__html: contentString}}></div>
                <script src="/js/common.js"></script>
                <script src="/js/vendor.js"></script>
                <script src="/js/test.js"></script>
            </Layout>
        )
    }
}

export default Index
