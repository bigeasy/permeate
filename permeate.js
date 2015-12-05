var Operation = require('operation')
var methods = {}
var slice = [].slice

function Controller (methods, index) {
    this._methods = methods
    this._index = index
}

Controller.prototype.delegate = function () {
    var vargs = slice.call(arguments)
    if (this._index + 1 < this._methods.length) {
        new Controller(this._methods, this._index + 1).apply(vargs)
    } else {
        vargs.pop().apply(null, vargs)
    }
}

Controller.prototype.remove = function () {
    this._methods.splice(this._index, 1)
}

Controller.prototype.apply = function (vargs) {
    this._methods[this._index].apply([ this ].concat(vargs))
}

function permeate (path) {
    if (methods[path]) {
        var controller = new Controller(methods[path], 0)
        var vargs = slice.call(arguments, 1)
        controller.apply(slice.call(arguments, 1))
    } else {
        arguments[arguments.length - 1]()
    }
}

function on (path, operation) {
    if (!methods[path]) {
        methods[path] = []
    }
    var operation = new Operation(operation)
    methods[path].unshift(operation)
    return { path: path, operation: operation }
}

function remove (cookie) {
    methods[cookie.path] = methods[cookie.path].filter(function (operation) {
        return cookie.operation !== operation
    })
    if (methods[cookie.path].length == 0) {
        delete methods[cookie.path]
    }
}

permeate.on = on
permeate.remove = remove

module.exports = permeate
