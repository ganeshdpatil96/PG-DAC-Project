package helpinghands.response;

import org.springframework.beans.BeanUtils;

import helpinghands.pojo.Product;



public class ProductResponseDTO {
	

	private String brand;
	private int prodid;
	private String pname;
	private String pcat;
	private String subcat;
	private int qty;
	private int donorId;
	private String donorName;
	private String photo;
	
	
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
	
	
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	
	public int getDonorId() {
		return donorId;
	}
	public void setDonorId(int donorId) {
		this.donorId = donorId;
	}
	public String getDonorName() {
		return donorName;
	}
	public void setDonorName(String donorName) {
		this.donorName = donorName;
	}
	public static ProductResponseDTO fromEntity(Product entity) {
		ProductResponseDTO dto = new ProductResponseDTO();
		dto.setDonorId(entity.getDonor().getId());
		dto.setDonorName(entity.getDonor().getName());
		BeanUtils.copyProperties(entity, dto);
		
		return dto;
	}
}
