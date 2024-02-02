package helpinghands;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import helpinghands.pojo.Admin;
import helpinghands.service.AdminService;




@SpringBootApplication
@EnableJpaAuditing
public class HelpingHandsApplication {

	public static void main(String[] args) {
		SpringApplication.run(HelpingHandsApplication.class, args);
	}
	@Bean
	public CommandLineRunner demo(AdminService srv) {
	    return (args) -> {
	    	if(srv.countAdmin()==0) {
	    		Admin admin=new Admin();
	    		admin.setEmail("admin@gmail.com");
	    		admin.setPwd("admin");
	    		admin.setUname("Administrator");
	    		srv.updateAdmin(admin);
	    		
				System.out.println("Admin user created successfully");
	    	}
	    };
	}
}
