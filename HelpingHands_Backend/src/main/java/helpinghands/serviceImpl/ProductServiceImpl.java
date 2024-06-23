package helpinghands.serviceImpl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import helpinghands.pojo.Product;
import helpinghands.repository.ProductRepository;
import helpinghands.service.DonorService;
import helpinghands.service.ProductService;
//import helpinghands.utils.StorageAmazonService;
import helpinghands.utils.StorageService;


@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired ProductRepository dao;
	//@Autowired
	//private StorageService storageService;
	@Autowired DonorService donorService;
//	@Autowired ProductService productService;
	//@Autowired OrderdetailService orderDetailsService;
	@Autowired
	private StorageService service;
	
	
	@Override
	public void addProduct(Product p,MultipartFile pic) {
		// TODO Auto-generated method stub
		String photo = service.store(pic);
		p.setPhoto(photo);
		dao.save(p);
	}

	@Override
	public List<Product> findProducts(int donorId) {
		// TODO Auto-generated method stub
		return dao.findByDonor(donorService.findById(donorId),Sort.by(Sort.Direction.DESC,"prodid"));
	}

	@Override
	public void updateProduct(Product p) {
		Product pp=dao.getById(p.getProdid());
		p.setDonor(pp.getDonor());
		dao.save(p);
	}

	@Override
	public void deleteProduct(int prodid) {
		// TODO Auto-generated method stub
		Product p=dao.getById(prodid);
		dao.delete(p);
	}

	@Override
	public List<Product> allProducts() {
		// TODO Auto-generated method stub
		return dao.findAll(Sort.by(Sort.Direction.DESC,"prodid"));
	}

	@Override
	public Product findProductById(int prodid) {
		// TODO Auto-generated method stub
		return dao.getById(prodid);
	}

	@Override
	public List<Product> categoryProducts(String pcat,String subcat) {
		// TODO Auto-generated method stub
		return dao.findByPcat(pcat,Sort.by(Sort.Direction.DESC,"prodid"));
	}

	@Override
	public Page<Product> allProductsPaginated(int page,int pagesize) {
		Page<Product> prods=dao.findAll(PageRequest.of(page, pagesize,Sort.by(Direction.DESC, "prodid")));
		System.err.println(prods.getSize());
		return prods;
	}

	

}
