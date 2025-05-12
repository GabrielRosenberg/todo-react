import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'
import { useTodoApi } from '../../api/useTodoApi.js'

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState([])
  const [activeList, setActiveList] = useState(null)
  const { fetchTodoLists, fetchActiveTodoList, updateTodoList } = useTodoApi()

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  const activeListHandler = (/** @type {string} */ listId) => {
    fetchActiveTodoList(listId).then(setActiveList)
  }

  if (!todoLists || !Object.keys(todoLists).length) return null
  return (
    <>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {todoLists.map((todoList) => (
              <ListItemButton key={todoList.id} onClick={() => activeListHandler(todoList.id)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoList.title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {activeList && (
        <TodoListForm
          key={activeList.id}
          todoList={activeList}
          saveTodoList={async (/** @type {string} */ id, /** @type {Todo[]} */ todos) => {
            updateTodoList(id, todos).then(setActiveList)
          }}
        />
      )}
    </>
  )
}
