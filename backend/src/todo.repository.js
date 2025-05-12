import { v4 as uuid } from 'uuid'

export const todoLists = [
  {
    id: uuid(),
    title: 'First List',
    todos: [
      {
        id: uuid(),
        description: 'This is a sample todo item',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: uuid(),
    title: 'Second List',
    todos: [
      {
        id: uuid(),
        description: 'This is a sample todo item',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
]

const getTodoListById = (/** @type {string} */ id) => {
  const todoList = todoLists.find((todoList) => todoList.id === id)
  if (!todoList) {
    throw new Error(`Todo list with id ${id} not found`)
  }
  return todoList
}

const getTodoLists = () => {
  return todoLists
}

const getTodoListsWithIdAndName = () => {
  return todoLists.flatMap((list) => ({ id: list.id, title: list.title }))
}

const doesTodoListExist = (/** @type {string} */ id) => {
  return todoLists.some((todoList) => todoList.id === id)
}

export { getTodoListById, getTodoListsWithIdAndName, getTodoLists, doesTodoListExist }
