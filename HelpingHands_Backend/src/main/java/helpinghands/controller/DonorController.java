package helpinghands.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import helpinghands.DTO.LoginDTO;
import helpinghands.pojo.Donor;
import helpinghands.response.Response;
import helpinghands.service.DonorService;



@CrossOrigin
@RestController
@RequestMapping("/api/donors")
public class DonorController {

	@Autowired 
	private DonorService donorService;
	
	@PostMapping
	public ResponseEntity<?> save(@RequestBody Donor donor) {		
		try{
			donorService.registerDonor(donor);
		
		return Response.success(donor);
		}
		catch(Exception e) {
			return Response.error(donor);
		}
	}
	
	@GetMapping
	public ResponseEntity<?> findAllDonor() {
		List<Donor> result = donorService.allDonor();
		return Response.success(result);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<?> findDonorProfile(@PathVariable("id") int id) {
		Donor result = donorService.findById(id);
		return Response.success(result);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteDonor(@PathVariable("id") int id) {
		donorService.deleteDonor(id);
		return Response.status(HttpStatus.OK);
	}
	
	@PostMapping("/validate")
	public ResponseEntity<?> validateUser(@RequestBody LoginDTO dto) {
		System.out.println(dto);
		Donor user=donorService.validate(dto.getEmail(),dto.getPwd());
		if(user!=null)
			return Response.success(user);
		else
			return Response.status(HttpStatus.NOT_FOUND);

	
	}
	
	
}
