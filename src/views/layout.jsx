import React from 'react'
import CssFile from './cssFile'
const Layout = React.createClass({
    propTypes: {
        title: React.PropTypes.string
    },

    render () {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                        <meta content={this.props.description} name="description" />
                        <meta content={this.props.keywords} name="keywords" />
                        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
                    {
                        this.props.cssFiles.map(file => <CssFile file={file} />)
                    }
                </head>
                <body>
                    {this.props.children}
                </body>
            </html>
        )
    }
})

export default Layout
