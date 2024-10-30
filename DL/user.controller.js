import userModel from './user.model.js'

async function create(data) {
    return await userModel.create(data)
}

async function read(filter = {}) {
    return await userModel.find(filter)
}

async function readOne(filter,select) { 
    return await userModel.findOne( filter).select(select)
}


export default {create, read, readOne}