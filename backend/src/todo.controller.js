import { getTodoListById, getTodoListsWithIdAndName } from './todo.repository.js'
import updateTodosService from './todo.service.js'
import statusCodes from './utils/statusCodes.js'

const getTodoLists = async (req, res) => {
  try {
    const todoLists = getTodoListsWithIdAndName()
    res.status(statusCodes.OK).json(todoLists)
  } catch {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
  }
}

const getTodoList = async (req, res) => {
  const listId = req.params.id
  try {
    const todoList = getTodoListById(listId)
    if (!todoList) {
      res.status(statusCodes.NOT_FOUND).json({ error: 'Todo list not found' })
    } else {
      res.status(statusCodes.OK).json(todoList)
    }
  } catch {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
  }
}

const updateTodoList = async (req, res) => {
  const listId = req.params.id
  const todoItemsInRequest = req.body

  if (!todoItemsInRequest || !Array.isArray(todoItemsInRequest)) {
    res.status(statusCodes.NO_CONTENT).json({ error: 'Missing todos' })
    return
  }

  const todoListToUpdate = getTodoListById(listId)
  if (!todoListToUpdate) {
    res
      .status(statusCodes.NOT_FOUND)
      .json({ error: `Todo list with the given ID ${listId} does not exist` })
    return
  }

  const updatedTodos = updateTodosService(todoItemsInRequest)

  todoListToUpdate.todos = updatedTodos
  res.status(statusCodes.CREATED).json(todoListToUpdate)
}

export { getTodoLists, getTodoList, updateTodoList }
