import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {

  return (
    <BrowserRouter>
    <NavBar />
     <Routes>
       <Route path='/' element={<Home />} />

     </Routes>
     <Footer />
    </BrowserRouter>
  )
}

export default App
