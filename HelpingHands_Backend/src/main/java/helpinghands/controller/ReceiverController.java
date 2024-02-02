package helpinghands.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import helpinghands.DTO.LoginDTO;
import helpinghands.pojo.Receiver;
import helpinghands.response.Response;
import helpinghands.service.ReceiverService;
import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@RequestMapping("/api/receivers")
public class ReceiverController {
	
	@Autowired 
	private ReceiverService receiverService;
	
	@PostMapping
	@ApiOperation(value="Save a customer details",response = Receiver.class)
	public ResponseEntity<?> save(@RequestBody Receiver receiver) {		
	try {	receiverService.registerReceiver(receiver);
		return Response.success(receiver);
	}
	
	catch(Exception e) {
		
		return Response.error(e);
	}
	}
	
	@GetMapping
	@ApiOperation(value="List all receiver",response=Iterable.class)
	public ResponseEntity<?> findAllReciver() {
		List<Receiver> result = receiverService.allReceiver();
		return Response.success(result);
	}
	
	@GetMapping("/{id}")
	@ApiOperation(value="Display the details of a receiver")
	public ResponseEntity<?> findReciverById(@PathVariable("id") int id) {
		Receiver result = receiverService.findById(id);
		return Response.success(result);
	}
	
	@PostMapping("/validate")
	public ResponseEntity<?> validateUser(@RequestBody LoginDTO dto) {
		System.out.println(dto);
		Receiver user=receiverService.validate(dto.getEmail(),dto.getPwd());
		if(user!=null)
			return Response.success(user);
		else
			return Response.status(HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<?> updateProfile(@RequestBody Receiver receiver,@PathVariable("id") int id) {
		receiverService.updateProfile(receiver);
		return Response.status(HttpStatus.OK);
	}

}
