import { TextField, Button, Typography, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export const TodoListItem = ({
  /** @type {Todo} */ todo,
  /** @type {number} */ index,
  onTextfieldChange,
  onCheckboxChange,
  onDelete,
}) => {
  return (
    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography sx={{ margin: '8px' }} variant='h6'>
        {index + 1}
      </Typography>
      <TextField
        sx={{ flexGrow: 1, marginTop: '1rem' }}
        label='What to do?'
        value={todo.description}
        onChange={(event) => onTextfieldChange(event, todo, index)}
      />
      <Checkbox
        sx={{ margin: '8px' }}
        checked={todo.completed ?? false}
        onChange={(_, isChecked) => onCheckboxChange(isChecked, todo, index)}
      />
      <Button sx={{ margin: '8px' }} size='small' color='secondary' onClick={() => onDelete(index)}>
        <DeleteIcon />
      </Button>
    </div>
  )
}
