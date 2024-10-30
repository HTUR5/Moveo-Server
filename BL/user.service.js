import userController from '../DL/user.controller.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

async function login(username, password) {
    try {
        if (!username || !password) throw ''
        const user = await userController.readOne({ username }, "+password");
        if (!user) throw ''
        const passwordIsCorrect = await bcrypt.compare(password, user.password);

        if (!passwordIsCorrect) throw ''

        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        return { ...user.toObject(), token };
    }
    catch {
        throw { message: "Incorrect username and/or password" };
    }
}


async function getSingleUser(username) {
    if (!username) throw { message: "invalid username" }
    return await userController.readOne({ username: username })
}

async function addNewUser(body) {
    let { username, password, instrument, permission } = body;
    // Check if user exists
    let user = await getSingleUser(username);
    if (user) throw { message: "user already exists" };
    if (password.length < 6) throw { message: "password is too short" };
    if (username.length == 0 || instrument.length == 0) throw { message: "fill all inputs" };
    const saltRounds = 10;
    // Hash the password
    const hash = await bcrypt.hash(password, saltRounds);
    user = { username, password: hash, instrument, permission };
    const userDB = await userController.create(user);
    return userDB;
}


export default { addNewUser, login, getSingleUser }