import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Mutation from './components/Mutation'
import './App.css'
import Delayed from './delayed/Delayed'
import Optimistic from './optimistic/Optimistic'
import Current from './current/Current'

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Mutation />} />
          <Route path='/delayed' element={<Delayed />} />
          <Route path='/optimistic' element={<Optimistic />} />
          <Route path='/current' element={<Current />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
