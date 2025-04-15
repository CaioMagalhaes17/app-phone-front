import { RouterProvider } from 'react-router-dom'
import { appRoute } from './routes'
import { useEffect } from 'react'
import useStore from './state'



function App() {
  const { load, setIsMobile } = useStore()

  useEffect(() => {
    load()
    console.log(window.outerWidth)
    if (window.outerWidth <= 768) {
      setIsMobile(true)
    }
  }, [load])

  return (
    <RouterProvider router={appRoute} />
  )
}

export default App
