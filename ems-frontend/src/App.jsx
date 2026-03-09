//Purpose of this Component: 

import './App.css'      
import EmployeeForm from './components/EmployeeForm'
import Footer from './components/Footer'    //path = URL path
import Header from './components/Header'    //element = which component to render
import EmployeeList from './components/EmployeeList'
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
                                                              
function App() {
  return ( 
    <> 
    <BrowserRouter>
      <Header/>
      <div className="main-content">
        <Routes>
            {/*Configuring route for EmployeeList */}
            {/*http://localhost:3000 [Means homepage]*/}  
            <Route path='/' element = {<EmployeeList/>}> </Route> 

            {/*When navigated to employees */}
            <Route path='/employees' element = {<EmployeeList/>}> </Route> 

            {/*http://localhost:3000/employees */}
            <Route path='/employee-list' element = {<EmployeeList/>}> </Route>

            {/*http://localhost:3000/add-employee */}
            <Route path='/add-employee' element = {<EmployeeForm/>}></Route>

            {/*http://localhost:3000/edit-employee/1 */}
            <Route path='/edit-employee/:id' element={<EmployeeForm/>}></Route> 
                 
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
    </>
  )
}
export default App

