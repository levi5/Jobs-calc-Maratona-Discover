import express from 'express'
import DashboardController  from '../controllers/dashboard/dashboard-controller.js'
import HomeController       from '../controllers/home/home-controller.js'
import JobsController       from '../controllers/job/job-controller.js'
import SignInController     from '../controllers/login/sign-in-controller.js'
import SignUpController     from '../controllers/login/sign-up-controller.js'
import UserController       from '../controllers/user/user-controller.js'

const route = express.Router()

route.get("/", HomeController.index )
route.get ("/login/signin",  SignInController.index)
route.post("/login/signin",  SignInController.auth)
route.get ("/login/signup",  SignUpController.index)
route.post("/login/signup",  SignUpController.save)

route.get("/dashboard/:userId",  DashboardController.index)

route.get ("/:userId/job", JobsController.save)
route.post("/:userId/job", JobsController.create)
route.get ("/:userId/job/edit/:id", JobsController.edit)
route.post("/:userId/job/edit/:id", JobsController.update)
route.post("/:userId/job/delete/:id", JobsController.delete)

route.get ("/profile/:userId", UserController.index)
route.post("/profile/:userId", UserController.update)
route.post("/profile/delete/:userId", UserController.delete)

export default route