import { v4 as uuid } from 'uuid'
import { doesTodoListExist } from './todo.repository.js'

const updateTodosService = (updatedTodos) => {
  return updatedTodos
    .map((updatedTodo) => {
      if (!updatedTodo.id && updatedTodo.description) {
        return {
          id: uuid(),
          description: updatedTodo.description,
          completed: updatedTodo.completed,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      }
      if (!doesTodoListExist(updatedTodo.id)) {
        return {
          ...updatedTodo,
          updatedAt: new Date(),
        }
      } else {
        return undefined
      }
    })
    .filter((todo) => todo !== undefined)
}

export default updateTodosService
