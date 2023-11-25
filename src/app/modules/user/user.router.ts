import express from 'express'
import { userControllers } from './user.controller';

const router = express();

router.post('/', userControllers.createUser)