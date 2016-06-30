import React, { Component, PropTypes } from 'react'
import {
    Router,
    Route,
    IndexRoute,
    createMemoryHistory
} from 'react-router'

import Test from './views/test'

export default (
    <Router history={ createMemoryHistory() }>
        <Route path="/" component={ Test }>
            <IndexRoute component={ Test }></IndexRoute>
            <Route path="/" component={ Test }></Route>
        </Route>
    </Router>
)
