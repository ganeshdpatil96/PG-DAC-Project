package helpinghands.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import helpinghands.pojo.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {

}
