import { RouterProvider } from 'react-router-dom'
import { appRoute } from './routes'

function App() {
  return (
    <RouterProvider router={appRoute} />
  )
}

export default App
