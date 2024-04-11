import styles from './App.module.scss'
import { Link, Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <div className={styles.root}>
        <header className={styles.header}>
          <img src='/cinema-ico.png' className={styles.logo} alt='logo' />
          <ul>
            <li>
              <Link to="/" className={styles.link}>Home</Link>
            </li>
            <li>
              <Link to="/about" className={styles.link}>About</Link>
            </li>
            <li>
              <Link to="/movies" className={styles.link}>Movies</Link>
            </li>
          </ul>
        </header>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default App
