import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

function Footer() {
  return (
    <div>
      <MyFooter></MyFooter>
    </div>
  );
}

function MyFooter() {
  return (
    <div className="container-fluid">
      <div className=" row mt-3 text-light bg-dark" style={{ height: '30vh' }}>
       
        <div className="col-3 mt-2">
          <div>For Receiver</div>
          <div className="mt-2">
            <ArrowRightOutlinedIcon></ArrowRightOutlinedIcon>
            Order
          </div>
          <div className="mt-2">
            <ArrowRightOutlinedIcon></ArrowRightOutlinedIcon>
            Products
          </div>
          
        </div>
        <div className="col-3 mt-2">
          <div>Quick Links</div>
          <div className="mt-2">
            <ArrowRightOutlinedIcon></ArrowRightOutlinedIcon>
            Home
          </div>
          <div className="mt-2">
            <ArrowRightOutlinedIcon></ArrowRightOutlinedIcon>
            About Us
          </div>
          <div className="mt-2">
            <ArrowRightOutlinedIcon></ArrowRightOutlinedIcon>
            Contact
          </div>
        </div>
        <div className="col-3 mt-2">
          <div>Contact Info</div>
          <div className=" mt-2">
            <HomeIcon></HomeIcon>
            Address : Pune,Maharashtra.
          </div>
          <div className=" mt-2 ">
            <PhoneIcon></PhoneIcon>
            Phone : 1800-350-4030
          </div>

          <div
            className="
            mt-2"
          >
            <EmailIcon></EmailIcon>
            Email : helpinghand@gmail.com
          </div>
        </div>
        <div className="col-3 mt-2 ">
          <div>Connect with us</div>
          <div className="mt-2">
            <InstagramIcon></InstagramIcon> Instagram
          </div>
          <div className="mt-2">
            <FacebookIcon></FacebookIcon> Facebook
          </div>
          <div className="mt-2">
            <TwitterIcon></TwitterIcon> Twitter
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
