import { Outlet} from 'react-router-dom'
import './App.css'
import Navbar from '../component/navbar'
import Footer from '../component/footer'
import { AuthProvider } from './context/AuthContext'

function App() {
 
  return (
    <>
    <AuthProvider>
      <Navbar></Navbar>
      <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-yellow-400'>
        <Outlet/>
      </main>
      <Footer></Footer>
    </AuthProvider>
      
    </>
  )
}

export default App
