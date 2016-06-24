import React, { Component, PropTypes } from 'react'
import ReactDOMServer from 'react-dom/server'

import Layout from './layout'
import Content from '../fronted/js/components/content'

class Index extends Component {
    constructor (props) {
        super(props)
    }

    render(){
        const test = 'hello world'
        const contentString = ReactDOMServer.renderToString(<Content list={this.props.list} />)
        return (
            <Layout title={this.props.string}>
                <h1>{test}</h1>
                <div id="content" dangerouslySetInnerHTML={{__html: contentString}}></div>
                <script src="/js/index.js"></script>
            </Layout>
        )
    }
}

export default Index
