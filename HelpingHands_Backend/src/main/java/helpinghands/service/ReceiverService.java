package helpinghands.service;

import java.util.List;

import helpinghands.pojo.Receiver;


public interface ReceiverService {
	void registerReceiver(Receiver cust);
	
	List<Receiver> allReceiver();
	
	Receiver findById(int id);
	
	Receiver validate(String email,String pwd);
	
	boolean verifyUserId(String email);
	
	void updateProfile(Receiver cust);
}
