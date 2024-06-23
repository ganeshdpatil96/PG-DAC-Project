package helpinghands.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import helpinghands.pojo.Donor;
import helpinghands.pojo.Product;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	List<Product> findByDonor(Donor donorId,Sort sort);
	List<Product> findByPcat(String pcat,Sort sort);
	
}
