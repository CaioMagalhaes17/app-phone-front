import { RouterProvider } from 'react-router-dom'
import { appRoute } from './routes'
import { useEffect } from 'react'
import useStore from './state'



function App() {
  const { load } = useStore()

  useEffect(() => {
    load()
  }, [load])
  return (
    <RouterProvider router={appRoute} />
  )
}

export default App
