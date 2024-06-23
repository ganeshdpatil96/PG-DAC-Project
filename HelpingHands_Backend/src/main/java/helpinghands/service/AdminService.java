package helpinghands.service;

import helpinghands.pojo.Admin;

public interface AdminService {
	Admin validate(String email,String pwd);
	void updateAdmin(Admin admin);
	long countAdmin();
}
