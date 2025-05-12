import { createContext, useCallback, use, useMemo, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

const SnackbarContext = createContext()

export const useSnackbar = () => {
  const context = use(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  })

  const showSnackbar = useCallback((message, severity = 'error') => {
    console.log('showSnackbar', message, severity)
    setSnackbar({ open: true, message, severity })
  }, [])

  const handleClose = () => setSnackbar((prev) => ({ ...prev, open: false }))

  const contextValue = useMemo(() => ({ showSnackbar }), [showSnackbar])

  return (
    <SnackbarContext value={contextValue}>
      {children}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext>
  )
}
