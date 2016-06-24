import React, { Component } from 'react'
import render from 'react-dom'

class Content extends Component {
    constructor (props) {
        super(props)
    }

    render(){
        let names = this.props.list
        return (
            <div>
                {
                    names.map((name) => {
                        return <div>{name}</div>
                    })
                }
            </div>
        )
    }
}

export default Content
