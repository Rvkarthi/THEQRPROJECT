import {Router} from 'express'
import {createUser, deleteUser, getAllUser, getUserByName, login} from '../controllers/user.controller.js'

const userRouter = Router()

//get all user   /auth/user/
userRouter.get("/", getAllUser) 

//get specific using  /auth/user/51
userRouter.get("/:name", getUserByName) 

//user login /auth/user/login/
userRouter.post("/login", login) 

//get all user /auth/user/signup
userRouter.post("/signup", createUser)

//delete user /auth/user/51
userRouter.delete("/:id", deleteUser) 

export default userRouter