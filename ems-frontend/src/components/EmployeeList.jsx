//Purpose of this Component: 

import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { Navigate, useNavigate } from 'react-router-dom';

function EmployeeList (){

  const [employees, setEmployees] = useState([])  
  const  navigator = useNavigate() //nothing but a JS function and here we are just assigning a JS function to a const variable.

  useEffect(()=> { 
    getAllEmployees();
  }, [])

  function getAllEmployees(){
    listEmployees().then((response) =>{ 
        setEmployees(response.data);
    }).catch(error => {
      console.error(error);
    })
  }

  function addNewEmployee(){
    navigator('/add-employee')
  }

  function updateEmployee(id){
    navigator(`/edit-employee/${id}`) //enclosed inside backtick symbols
  }
  
  //Delete Employee
  function removeEmployee(id){
    const isConfirmed = window.confirm("Are you sure you want to delete this employee?"); //confirm() is a built-in browser method. Returns true if the user clicks OK. Returns false if the user clicks Cancel or closes the dialog

    if(isConfirmed){
    console.log(id);
    deleteEmployee(id).then((response) =>{
      getAllEmployees();
      alert("Employee Deleted Successfully");
    }).catch(error =>{
      console.error(error)
    })
  }
}

  return (
    <div className='.container'>
      <h2 className='text-center mt-3'>List of Employees</h2>
      <button className = "btn btn-primary add-employee-btn" onClick={addNewEmployee}>
        Add Employee
      </button>
      
      <table className='table table-striped table-bordered w-75 mx-auto'>
        <thead >
          <tr>
            <th>Employee ID</th>
            <th>First Name</th> 
            <th>Last Name</th> 
            <th>Email ID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            employees.map(emp =>
            <tr key={emp.id}>
              <td>{emp.id}</td> 
              <td>{emp.firstName}</td> 
              <td>{emp.lastName}</td> 
              <td>{emp.email}</td>
              
              <td>
                <button className='btn btn-info' onClick={()=> updateEmployee(emp.id)}>Update</button>
                {/* Here we have added a button and passed an event handler "onClick" with the function name "updateEmployee(emp.id)" to this onClick event. And got the employee id from the emp obj  */}

                <button className='btn btn-danger' onClick={()=> removeEmployee(emp.id)}>Delete</button>
              </td>

            </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
export default EmployeeList
