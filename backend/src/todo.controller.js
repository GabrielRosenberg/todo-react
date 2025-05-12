import { getTodoListById, getTodoListsWithIdAndName } from './todo.repository.js'
import updateTodosService from './todo.service.js'

const getTodoLists = async (req, res) => {
  try {
    const todoLists = getTodoListsWithIdAndName()
    res.status(200).json(todoLists)
  } catch (error) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
  }
}

const getTodoList = async (req, res) => {
  const listId = req.params.id
  try {
    const todoList = getTodoListById(listId)
    if (!todoList) {
      res.status(404).json({ error: 'Todo list not found' })
    } else {
      res.status(200).json(todoList)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

const updateTodoList = async (req, res) => {
  const listId = req.params.id
  const todoItemsInRequest = req.body

  if (!todoItemsInRequest || !Array.isArray(todoItemsInRequest)) {
    res.status(204).json({ error: 'Missing todos' })
    return
  }

  const todoListToUpdate = getTodoListById(listId)
  if (!todoListToUpdate) {
    res.status(404).json({ error: `Todo list with the given ID ${listId} does not exist` })
    return
  }

  const updatedTodos = updateTodosService(todoItemsInRequest)

  todoListToUpdate.todos = updatedTodos
  res.status(201).json(todoListToUpdate)
}

export { getTodoLists, getTodoList, updateTodoList }
