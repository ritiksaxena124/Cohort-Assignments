
import './App.css'
import Assignment2 from './components/Assignment2'
import AssignmentList from './components/AssignmentList'
import ProfileCard from './components/ProfileCard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <>
      <div className='w-full bg-zinc-900 text-white h-screen'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AssignmentList />} />
            <Route path='/assignment-1' element={<ProfileCard />} />
            <Route path='/assignment-2' element={<Assignment2 />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
