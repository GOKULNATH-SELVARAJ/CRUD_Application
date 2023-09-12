import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import User from './User'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import ViewUser from './ViewUser'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/user' element={<User/>}></Route>
        <Route path='/create' element={<CreateUser />}></Route>
        <Route path='/update/:id' element={<UpdateUser />}></Route>
        <Route path='/view/:id' element={<ViewUser />}></Route>        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App