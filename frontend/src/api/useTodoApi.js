const BASE_URL = 'http://localhost:3001'

export const useTodoApi = () => {
  const { showSnackbar } = useSnackbar()

  const fetchTodoLists = async () => {
    try {
      const res = await fetch(`${BASE_URL}/todos`)
      return await res.json()
    } catch (err) {
      console.error('Error fetching todo lists:', err)
    }
  }

  const fetchActiveTodoList = async (listId) => {
    try {
      const res = await fetch(`${BASE_URL}/todos/${listId}`)
      return await res.json()
    } catch (err) {
      console.error('Error fetching active todo list:', err)
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
    } catch (err) {
      console.error('Error updating todo list:', err)
    }
  }
  return { fetchTodoLists, fetchActiveTodoList, updateTodoList }
}
