/*!
 * base on react-view
 * https://github.com/koajs/react-view#readme
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
import { cssModuleConfig } from '../config'

import React from 'react'
import ReactDOMServer from 'react-dom/server'

import jsBeautify from 'js-beautify'
import assert from 'assert'
import copy from 'copy-to'
import path from 'path'

const beautifyHTML = jsBeautify.html

let defaultOptions = {
    doctype: '<!DOCTYPE html>',
    beautify: false,
    cache: process.env.NODE_ENV === 'production',
    extname: 'jsx',
    writeResp: true,
    views: path.join(__dirname, 'views'),
    internals: false
}

module.exports = (app, _options) => {
    _options = _options || {}

    let options = {}
    copy(_options).and(defaultOptions).to(options)
    options.views = path.resolve(options.views)
    options.extname = options.extname.replace(/^\.?/, '.')

    // match function for cache clean
    const match = createMatchFunction(options.views)

    /**
    * render react template to html
    *
    * @param {String} filename
    * @param {Object} _locals
    * @return {String}
    */
    app.context.render = function (filename, _locals, internals) {
        // resolve filepath
        let filepath = path.join(options.views, filename)
        console.log('filepath', filepath)
        if (filepath.indexOf(options.views) !== 0) {
            const err = new Error('Cannot find module ' + filename)
            err.code = 'REACT'
            throw err
        }
        if (!path.extname(filepath)) filepath += options.extname

        if (typeof _locals === 'boolean') {
            internals = _locals
            _locals = {}
        }
        internals = internals !== undefined ? internals : options.internals

        const render = internals ? ReactDOMServer.renderToString : ReactDOMServer.renderToStaticMarkup

        let locals = {}
        // merge koa state
        merge(locals, this.state || {})
        merge(locals, _locals)

        let markup = options.doctype || ''
        try {
            let component = require(filepath)
            // Transpiled ES6 may export components as { default: Component }
            component = component.default || component
            markup += render(React.createElement(component, locals))
        } catch (err) {
            err.code = 'REACT'
            throw err;
        } finally {
            if (!options.cache) {
                cleanCache(match)
            }
        }

        if (options.beautify) {
            // NOTE: This will screw up some things where whitespace is important, and be
            // subtly different than prod.
            markup = beautifyHTML(markup)
        }

        const writeResp = locals.writeResp === false ? false : (locals.writeResp || options.writeResp);
        if (writeResp) {
            this.type = 'html'
            this.body = markup
        }

        return markup
    }
}


/**
 * merge source to taget
 *
 * @param {Object} target
 * @param {Object} source
 * @return {Object}
 */
function merge (target, source) {
    for (let key in source) {
        target[key] = source[key]
    }
    return target
}

/**
 * create a match function for clean cache
 *
 * @param {Mixed} input
 * @return {Function}
 */
function createMatchFunction (input) {
    if (!Array.isArray(input)) input = [input]

    input = input.map((item) => {
        return typeof item === 'string' ? new RegExp('^' + item) : item
    })

    return function match(file) {
        for (let i = 0; i < input.length; i++) {
            if (input[i].test(file)) return true
        }
    }
}

/**
 * Remove all files from the module cache that are in the view folder.
 *
 * @param {Function} match
 */
function cleanCache (match) {
    Object.keys(require.cache).forEach((module) => {
        if (match(require.cache[module].filename)) {
            delete require.cache[module]
        }
    })
}
