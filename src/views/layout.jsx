import React from 'react'

const Layout = React.createClass({
    propTypes: {
        title: React.PropTypes.string
    },

    render () {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                </head>
                <body>
                    {this.props.children}
                    <script src="/js/vender.js"></script>
                </body>
            </html>
        )
    }
})

export default Layout
