package helpinghands.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import helpinghands.pojo.Receiver;
import helpinghands.repository.ReceiverRepository;
import helpinghands.service.ReceiverService;



@Service
public class ReceiverServiceImpl implements ReceiverService {
	
	@Autowired private ReceiverRepository dao;

	@Override
	public void registerReceiver(Receiver cust) {
		
		dao.save(cust);
	}

	@Override
	public List<Receiver> allReceiver() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public Receiver findById(int id) {
		// TODO Auto-generated method stub
		return dao.getById(id);
	}

	@Override
	public Receiver validate(String email, String pwd) {
		Receiver cc=dao.findByEmail(email);
		if(cc!=null && cc.getPwd().equals(pwd)) {
			return cc;
		}
		return null;
	}
	
	@Override
	public boolean verifyUserId(String email) {
		// TODO Auto-generated method stub
		return dao.findByEmail(email)!=null;
	}

	@Override
	public void updateProfile(Receiver receiver) {
		// TODO Auto-generated method stub
		if(receiver.getPwd().equals("") || receiver.getPwd()==null) {
			receiver.setPwd(findById(receiver.getId()).getPwd());
		}
		dao.save(receiver);	
	}
	
}
