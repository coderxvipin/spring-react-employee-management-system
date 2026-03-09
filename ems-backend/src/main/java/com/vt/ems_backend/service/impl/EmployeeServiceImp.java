package com.vt.ems_backend.service.impl;

import java.util.ArrayList; 
import java.util.List;

import org.springframework.stereotype.Service;

import com.vt.ems_backend.customexception.ResourceNotFoundException;
import com.vt.ems_backend.dto.EmployeeDto;
import com.vt.ems_backend.entity.Employee;
import com.vt.ems_backend.mapper.EmployeeMapper;
import com.vt.ems_backend.repository.EmployeeRepository;
import com.vt.ems_backend.service.EmployeeService;

import lombok.AllArgsConstructor;

@Service //tells the spring to create a spring bean of this class
@AllArgsConstructor
public class EmployeeServiceImp implements EmployeeService{
	
	private EmployeeRepository employeeRepository; //dependency injected.(Constructor based (Lombok))
	
	//Create or add an employee
	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		Employee employee = EmployeeMapper.mapToEmployee(employeeDto); //Database can not store DTO, we must convert employee DTO into employee JPA entity in order to store into database.
		Employee savedEmployee = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(savedEmployee);
	}
	
	//Fetch employee by Id
	@Override
	public EmployeeDto getEmployeeById(Long empId) {
		boolean employee = employeeRepository.existsById(empId);
		if(employee) {
			//Fetch employee
			Employee fetchedEmployee = employeeRepository.findById(empId).get();
			
			//Convert entity to DTO and return it
			EmployeeDto employeeDto = EmployeeMapper.mapToEmployeeDto(fetchedEmployee);		
			return employeeDto;
	
		}else {
			throw new ResourceNotFoundException("User does not exist wit the ID: " + empId);
		}
	}
	
	//Fetch all employees
	@Override
	public List<EmployeeDto> getAllEmployees() {

	    // 1. Fetch all employees from database
	    List<Employee> employees = employeeRepository.findAll();

	    // 2. Create an empty list to store EmployeeDto objects
	    List<EmployeeDto> employeeDtos = new ArrayList<>();

	    // 3. Convert each Employee to EmployeeDto one by one
	    for (Employee employee : employees) {

	        EmployeeDto dto = EmployeeMapper.mapToEmployeeDto(employee);
	        employeeDtos.add(dto);
	    }

	    // 4. Return the list of DTOs
	    return employeeDtos;
	}
	
	//Update employee by Id
	@Override
	public EmployeeDto updateEmployee(Long empId, EmployeeDto dto) {
		//Checking if employee exists
		boolean exists = employeeRepository.existsById(empId); 
		if(!exists) {
			throw new ResourceNotFoundException("Employee does not exist with the ID:" + empId
			);
		}
		// Step 2: Fetch employee object from database (safe because we checked above). Fetched object values are updated with dto object coming from API put request.
		Employee employee = employeeRepository.findById(empId).get();
		
		// Step 3: Update fields.
		employee.setFirstName(dto.getFirstName());
	    employee.setLastName(dto.getLastName());
	    employee.setEmail(dto.getEmail());
	    
	    // Step 4: Save and return updated DTO
	    Employee updatedEmployee = employeeRepository.save(employee);
	    
	    return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
	}
	
	//Delete employee by Id
	@Override
	public void deleteEmployee(Long empId) {
		//Check if employee exists.
		boolean exists = employeeRepository.existsById(empId);
		if(exists) {
			employeeRepository.deleteById(empId);
		}else {
			throw new ResourceNotFoundException("Employee does not exist with ID: "+ empId);
			//we must have to use throw and create object of the CustomException class at the same time. In order to throw an exception immediately.
		}
	}
}






