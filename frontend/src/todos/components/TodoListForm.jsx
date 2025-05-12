import { useState } from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import { TodoListItem } from './TodoListItem.jsx'
import AddIcon from '@mui/icons-material/Add'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((name, index) => (
            <TodoListItem
              key={index}
              todo={{ description: name, completed: false }}
              index={index}
              onTextfieldChange={(event) => {
                setTodos([
                  // immutable update
                  ...todos.slice(0, index),
                  event.target.value,
                  ...todos.slice(index + 1),
                ])
              }}
              onCheckboxChange={() => {}}
              onDelete={() => {
                setTodos([
                  // immutable delete
                  ...todos.slice(0, index),
                  ...todos.slice(index + 1),
                ])
              }}
            />
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, ''])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
