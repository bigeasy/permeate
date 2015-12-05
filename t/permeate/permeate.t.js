require('proof')(6, prove)

function prove (assert) {
    var permeate = require('../..')

    permeate('bigeasy.example.invoke', 1, function (callback) {
        assert(true, 'unregistered')
    })

    var cookie = permeate.on('bigeasy.example.invoke', function (controller, callback) {
        assert(true, 'called')
        callback()
    })

    permeate('bigeasy.example.invoke', function (callback) {
        assert(true, 'hooked')
    })
    permeate.remove(cookie)

    permeate('bigeasy.example.invoke', function (callback) {
        assert(true, 'unhooked')
    })

    var cookies = []
    cookie = permeate.on('bigeasy.example.invoke', function () {
        throw new Error
    })
    cookies.push(cookie)
    cookie = permeate.on('bigeasy.example.invoke', function () {
        throw new Error
    })
    cookies.push(cookie)

    cookies.forEach(function (cookie) {
        permeate.remove(cookie)
    })

    permeate('bigeasy.example.invoke', function (callback) {
        assert(true, 'double unhooked')
    })

    permeate.on('bigeasy.example.invoke', function (controller, value, callback) {
        controller.delegate(function () { callback(null, value) })
    })

    permeate.on('bigeasy.example.invoke', function (controller, value, callback) {
        controller.delegate(value, function (error, value) {
            controller.remove()
            callback(null, value + 1)
        })
    })

    permeate('bigeasy.example.invoke', 1, function (error, value) {
        assert(value, 2, 'example')
    })
}
