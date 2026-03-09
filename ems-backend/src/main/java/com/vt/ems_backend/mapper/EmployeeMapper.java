package com.vt.ems_backend.mapper;

import com.vt.ems_backend.dto.EmployeeDto; 
import com.vt.ems_backend.entity.Employee;

public class EmployeeMapper { //To transfer data between client and server.
	
	public static EmployeeDto mapToEmployeeDto (Employee employee) { //maps employee JPA entity into employee dto			
		//1. Manually creating EmployeeDto object
		EmployeeDto employeeDto = new EmployeeDto();
		
		//2. Set values one by one Entity to DTO.
		employeeDto.setId(employee.getId());
		employeeDto.setFirstName(employee.getFirstName());
		employeeDto.setLastName(employee.getLastName());
		employeeDto.setEmail(employee.getEmail());
		
		return employeeDto;
		
		//return new EmployeeDto(
			//employee.getId(),
			//employee.getFirstName(),
			//employee.getLastName(),
			//employee.getEmail()
		//);
	}

	public static Employee mapToEmployee (EmployeeDto employeeDto) { //maps employee dto into employee JPA entity
		
		// 1. Manually create the Employee object
	    Employee employee = new Employee();

	    // 2. Set values one by one from DTO to Entity
	    employee.setId(null); // JPA will auto-generate this
	    employee.setFirstName(employeeDto.getFirstName());
	    employee.setLastName(employeeDto.getLastName());
	    employee.setEmail(employeeDto.getEmail());

	    // 3. Return the employee object reference
	    return employee; // "employee" reference variable points to the Employee object in the memory. 
		
	    //Same we can do using parameterized constructor of the Employee class. [It can both create AND initialize the object]
//		return new Employee(
//			null,
//			employeeDto.getFirstName(),
//			employeeDto.getLastName(),
//			employeeDto.getEmail()
//		);
	}
}
