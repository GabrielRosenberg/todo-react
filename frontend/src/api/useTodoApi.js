const BASE_URL = 'http://localhost:3001'
import { useSnackbar } from '../hooks/useSnackbar'

export const useTodoApi = () => {
  const { showSnackbar } = useSnackbar()

  const fetchTodoLists = async () => {
    try {
      const res = await fetch(`${BASE_URL}/todos`)
      return await res.json()
    } catch {
      showSnackbar('Error fetching todo lists')
    }
  }

  const fetchActiveTodoList = async (listId) => {
    try {
      const res = await fetch(`${BASE_URL}/todos/${listId}`)
      return await res.json()
    } catch {
      showSnackbar('Error fetching active todo list')
    }
  }

  const updateTodoList = async (listId, todos) => {
    try {
      const res = await fetch(`${BASE_URL}/todos/${listId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todos),
      })
      return await res.json()
    } catch {
      showSnackbar('Error updating todo list')
    }
  }
  return { fetchTodoLists, fetchActiveTodoList, updateTodoList }
}
