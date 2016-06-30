import React, { Component, PropTypes } from 'react'
import ReactDOMServer from 'react-dom/server'

import Home from '../routes/views/home'
import Layout from './layout'
import JsFile from './jsFile'

class Index extends Component {
    render () {
        console.log('this.props.staticFiles', this.props.staticFiles)
        return (
            <Layout
                title={this.props.title}
                description={this.props.description || ''}
                keywords={this.props.keywords || ''}
                cssFiles={this.props.staticFiles.css}
            >
                <Home></Home>
                {
                    this.props.staticFiles.js.map(file => <JsFile file={file} />)
                }
            </Layout>
        )
    }
}

export default Index
