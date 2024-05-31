
import './App.css'
import AssignmentList from './components/AssignmentList'
import ProfileCard from './components/ProfileCard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <>
      <div className='w-screen bg-zinc-900 text-white h-screen'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AssignmentList />} />
            <Route path='/profile-card' element={<ProfileCard />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
