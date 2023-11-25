import express from 'express'
import { userControllers } from './user.controller'

const router = express()

router.post('/', userControllers.createUser)
router.get('/', userControllers.getAllUsers)
router.get('/:userId', userControllers.getSingleUser)
router.put('/:userId', userControllers.updateAUser)
router.delete('/:userId', userControllers.deleteAUser)
router.put('/:userId/orders', userControllers.makeAOrder)
router.get('/:userId/orders', userControllers.getAllOrdersFromUser)
router.get('/:userId/orders/total-price', userControllers.getTotalPrice)

export const userRoutes = router
