import { useState } from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import useDebounce from '../../hooks/useDebounce.js'
import { TodoListItem } from './TodoListItem.jsx'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const handleSubmit = () => {
    saveTodoList(todoList.id, todos)
  }

  const debounceEffect = useDebounce(handleSubmit)

  const onTextfieldChange = (
    /** @type {import("react").ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} */ event,
    /** @type {Todo} */ todo,
    /** @type {number} */ index
  ) => {
    setTodos([
      ...todos.slice(0, index),
      {
        ...todo,
        description: event.target.value,
      },
      ...todos.slice(index + 1),
    ])
    debounceEffect()
  }

  const onCheckboxChange = (
    /** @type {boolean} */ isChecked,
    /** @type {Todo} */ todo,
    /** @type {number} */ index
  ) => {
    const newTodos = [
      ...todos.slice(0, index),
      {
        ...todo,
        completed: isChecked,
      },
      ...todos.slice(index + 1),
    ]
    setTodos(newTodos)
    saveTodoList(todoList.id, newTodos)
  }

  const onDelete = (/** @type {number} */ index) => {
    const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)]
    setTodos(newTodos)
    saveTodoList(todoList.id, newTodos)
  }

  const onAddEmptyTodo = () => {
    setTodos([...todos, { description: '' }])
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos.map((/** @type {Todo} */ todo, /** @type {number} */ index) => (
            <TodoListItem
              key={todo.id ?? index}
              todo={todo}
              index={index}
              onTextfieldChange={onTextfieldChange}
              onCheckboxChange={onCheckboxChange}
              onDelete={onDelete}
            />
          ))}
          <CardActions>
            <Button type='button' color='primary' onClick={onAddEmptyTodo}>
              Add Todo
              <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
