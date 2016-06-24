import { render } from 'react-dom'
import Content from '../components/content'

import '../../css/base.less'
(() => {
    const container = document.getElementById('content')

    const list = ['hello', 'i am weiqi']
    render(
        <Content list={list}/>,
        container
    )
})()
