import React, { Component, PropTypes } from 'react'

const propTypes = {
    file: PropTypes.string
}

class JsFile extends Component {
    render () {
        let file = this.props.file
        return (
            <script src={file} type="text/javascript"></script>
        )
    }
}

export default JsFile
