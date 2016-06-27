import React, { Component, PropTypes } from 'react'

const propTypes = {
    file: PropTypes.string
}

class CssFile extends Component {
    render () {
        let file = this.props.file
        return (
            <link href={file} type="text/css" rel="stylesheet" />
        )
    }
}


export default CssFile
