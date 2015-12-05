

var permeate = require('permeate')


permeate('bigeasy.permate.temperature', value, function (value, callback) {
    actual value
})

permeate.on('bigeasy.permeate.temperature', value, function (value, callback) {
})


permeate.on('bigeasy.permeate.temperature', value, { object: this, method: 'measure' })

permeate.on('bigeasy.permeate.temperature', value, { object: this, method: 'measure' })
permeate.on('bigeasy.permeate.temperature', value, cadence(function (async, permeate, value) {
    if (value == 1) {
        async(function () {
            permeate.delagate(value, async())
        }, function (result) {
            permeate.remove()
            return [ result + 1 ]
        })
    } else {
        permiate.delagate(value, async())
    }
})
