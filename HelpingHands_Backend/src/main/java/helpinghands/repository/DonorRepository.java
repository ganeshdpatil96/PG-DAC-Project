package helpinghands.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import helpinghands.pojo.Donor;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Integer> {
	
	Donor findByEmail(String email);

}
