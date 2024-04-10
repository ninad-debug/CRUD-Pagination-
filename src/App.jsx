import { React, lazy, Suspense } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import PublicRoutes from './routes/PublicRoutes'
import SignInPage from './pages/SignInPage'
import PrivateRoutes from './routes/PrivateRoutes'
import HomePage from './pages/HomePage'
// import FormContainer from './components/Form'
const LazyFormContainer =lazy(() => import('./components/Form'))


function App() {

  const router = createBrowserRouter([
    {
      path: "/signin",
      element: <PublicRoutes  component={<SignInPage />}/>
    },
    {
      path: "/",
      element: <PrivateRoutes component={<HomePage />}/>
    },
    {
      path: "/adduser",
      element: <PrivateRoutes component={
        <Suspense fallback="Loading...">
          <LazyFormContainer />
        </Suspense>} />
    },
    {
      path: 'edituser/:userid',
      element: <PrivateRoutes component={
      <Suspense fallback="Loading...">
        <LazyFormContainer />
      </Suspense>} />
    },
  ])

  return (
      <div className='App'>
        <RouterProvider router={router}/>
      </div>
      
  )
}

export default App
