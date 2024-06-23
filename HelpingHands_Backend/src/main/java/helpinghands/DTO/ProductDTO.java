package helpinghands.DTO;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import helpinghands.pojo.Product;



public class ProductDTO {
	
	private int prodid;
	private String pname;
	private String pcat;
	private String subcat;
	
	private int qty;
	private int sellerId;
	private String brand;
	private MultipartFile pic;
	
	
	public int getQty() {
		return qty;
	}
	public void setQty(int qty) {
		this.qty = qty;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public MultipartFile getPic() {
		return pic;
	}
	public void setPic(MultipartFile pic) {
		this.pic = pic;
	}
	public int getProdid() {
		return prodid;
	}
	public void setProdid(int prodid) {
		this.prodid = prodid;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public String getPcat() {
		return pcat;
	}
	public void setPcat(String pcat) {
		this.pcat = pcat;
	}
	public String getSubcat() {
		return subcat;
	}
	public void setSubcat(String subcat) {
		this.subcat = subcat;
	}
	
	public int getSellerId() {
		return sellerId;
	}
	public void setSellerId(int sellerId) {
		this.sellerId = sellerId;
	}
	
	
	@Override
	public String toString() {
		return "ProductDTO [prodid=" + prodid + ", pname=" + pname + ", pcat=" + pcat + ", subcat=" + subcat
				+ ", qty=" + qty + ", sellerId=" + sellerId + ", pic=" + pic + "]";
	}
	public static Product toEntity(ProductDTO dto) {
		Product entity=new Product();
		BeanUtils.copyProperties(dto, entity, "pic");		
		return entity;
	}
}
