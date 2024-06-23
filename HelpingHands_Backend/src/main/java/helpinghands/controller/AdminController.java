package helpinghands.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import helpinghands.DTO.LoginDTO;
import helpinghands.pojo.Admin;
import helpinghands.response.Response;
import helpinghands.service.AdminService;
import io.swagger.annotations.ApiOperation;


@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminController {
	
	@Autowired 
	private AdminService adminService;
	
	
	@PostMapping("/validate")
	@ApiOperation(value = "Validate the admin user")
	public ResponseEntity<?> validateUser(@RequestBody LoginDTO dto) {
		System.out.println(dto);
		Admin admin=adminService.validate(dto.getEmail(),dto.getPwd());
		if(admin!=null)
			return Response.success(admin);
		else
			return Response.status(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping
	@ApiOperation(value="Update the admin profile such as name and password")
	public ResponseEntity<?> updateProfile(@RequestBody Admin admin) {
		adminService.updateAdmin(admin);
		return Response.status(HttpStatus.OK);
	}

}
