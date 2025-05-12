import { TodoLists } from './todos/components/TodoLists'
import MainAppBar from './todos/components/AppBar.jsx'
import { SnackbarProvider } from './context/SnackbarContext.jsx'

/** @type {React.CSSProperties} */
const mainWrapperStyle = { display: 'flex', flexDirection: 'column' }

/** @type {React.CSSProperties} */
const centerContentWrapper = { display: 'flex', justifyContent: 'center' }

/** @type {React.CSSProperties} */
const contentWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '80rem',
  flexGrow: 1,
}

const MainWrapper = ({ children }) => {
  return (
    <div style={mainWrapperStyle}>
      <MainAppBar />
      <div style={centerContentWrapper}>
        <div style={contentWrapperStyle}>{children}</div>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <SnackbarProvider>
      <MainWrapper>
        <TodoLists style={{ margin: '1rem' }} />
      </MainWrapper>
    </SnackbarProvider>
  )
}

export default App
