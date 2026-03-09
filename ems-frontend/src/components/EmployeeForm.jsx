import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeForm = () => {

  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setEmployee(response.data);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id]);

  // Single change handler
  function handleChange(e) {
    const { name, value } = e.target;

    setEmployee({
      ...employee,
      [name]: value
    });
  }

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {

      if (id) {
        updateEmployee(id, employee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error => {
          console.error(error);
        })

      } else {
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error => {
          console.error(error);
        })
      }
    }
  }

  function resetForm() {
    setEmployee({
      firstName: '',
      lastName: '',
      email: ''
    });

    setErrors({
      firstName: '',
      lastName: '',
      email: ''
    });
  }

  function validateForm() {

    let valid = true;

    const errorsCopy = { ...errors };

    if (employee.firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First name is required';
      valid = false;
    }

    if (employee.lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    }

    if (employee.email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className='text-center'>Update Employee</h2>
    } else {
      return <h2 className='text-center'>Add Employee</h2>
    }
  }

  return (

    <div className='container col-md-6 offset-md-3'>
      <br /><br />

      <div className='row'>
        <div className='card'>

          {pageTitle()}

          <div className='card-body'>

            <form>

              {/* First Name */}
              <div className='form-group mb-2'>
                <label>First Name</label>
                <input
                  type='text'
                  name='firstName'
                  placeholder='Enter First Name'
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  value={employee.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>

              {/* Last Name */}
              <div className='form-group mb-2'>
                <label>Last Name</label>
                <input
                  type='text'
                  name='lastName'
                  placeholder='Enter Last Name'
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  value={employee.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>

              {/* Email */}
              <div className='form-group mb-2'>
                <label>Email</label>
                <input
                  type='text'
                  name='email'
                  placeholder='Enter Email'
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={employee.email}
                  onChange={handleChange}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>

              {/* Buttons */}

              <button
                type="button"
                className='btn btn-secondary ms-2'
                onClick={resetForm}
              >
                Reset
              </button>

              <button
                className="btn btn-success ms-2"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  )
}

export default EmployeeForm;