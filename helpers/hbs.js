const moment = require('moment')

module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format)
    },
    editIcon: function (chunkUser, loggedUser, chunkId, floating = true) {
        if (chunkUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/chunks/edit/${chunkId}" class="btn-floating halfway-fab orange"><i class="fas fa-edit"></i></a>`
            } else {
                return `<a href="/chunks/edit/${chunkId}"><i class="fas fa-edit"></i></a>`
            }
        } else {
            return ''
        }
    }
}