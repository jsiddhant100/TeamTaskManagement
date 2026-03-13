import './App.css'
import Dashboard from './screens/dashboard/Dashboard'
import { TaskProvider } from './context/TaskContext'

function App() {

  return (
    <TaskProvider>
      <Dashboard />
    </TaskProvider>
  )
}

export default App
