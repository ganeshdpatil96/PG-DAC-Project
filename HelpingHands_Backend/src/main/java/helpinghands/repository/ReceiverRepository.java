package helpinghands.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import helpinghands.pojo.Receiver;


@Repository
public interface ReceiverRepository extends JpaRepository<Receiver, Integer> {
	
	Receiver findByEmail(String email);
}
