import { useState } from 'react'
import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <header>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
          </ul>
        </header>
      </div>
      <main>
        <Outlet />
      </main>

    </>
  )
}

export default App
