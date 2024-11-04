const data = require("../data/users.json")

function getAll() {
    return data.users
}

function get(id) {
    return data.users.find((user) => user.id == id)
}

function add(user) {
    user.id = data.users.reduce((prev, x)=> (x.id > prev ? x.id : prev), 0) + 1
    data.users.push(user)
    return user
}

function update(id, user) {
    const userToUpdate = data.users.find((user) => user.id == id)
    Object.assign(userToUpdate, user)
    return userToUpdate
}

function remove(id) {
    const userIndex = data.users.find((user) => user.id == id)
    data.users.splice(userIndex, 1)
    return {success: true, message: "User Deleted", id: id}
}

module.exports = {
    getAll,
    get,
    add,
    update,
    remove
}