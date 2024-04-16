import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { About } from './features/About/About.tsx'
import Movies from './features/Movies.tsx'
import { Provider } from 'react-redux'
import store from './store.ts'
import Home from './features/Home.tsx';
import { ErrorBoundary } from './ErrorBoundary.tsx';

function AppEntryPoint() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppEntryPoint />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/movies',
        element: <Movies />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
