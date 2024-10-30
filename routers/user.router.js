import {Router} from 'express'
const router = Router()

import userService from '../BL/user.service.js'

//add new user
router.post('/register', async (req, res) => {
  try {
    const user = await userService.addNewUser(req.body);
    res.send(user);
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(400).send(err.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await userService.login(req.body.username, req.body.password)
    res.send(user)
  } catch (err) {
    res.status(400).send(err?.message || "Error")
  }
})

export default router;