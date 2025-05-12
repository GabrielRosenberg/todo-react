import express from 'express'
import { getTodoList, getTodoLists, updateTodoList } from './todo.controller.js'

const router = express.Router()

// GET /todos → List all todos
router.get('/', getTodoLists)

// GET /todos/:id → Get a specific todo by ID
router.get('/:id', getTodoList)

// PUT /todos/:id → Update a todo
router.put('/:id', updateTodoList)

export default router
