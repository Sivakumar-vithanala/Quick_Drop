import {Router} from 'express'
import auth from '../middleware/auth.js'
import { createProductController } from '../Controllers/productControllr.js'

const productRouter = Router()


productRouter.post("/create",auth,createProductController)

export default productRouter