import React from "react";
import Logo from "../Assets/Logo.svg";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src={Logo} alt="" />
        </div>
        <div className="footer-icons">
          <a href="https://twitter.com">
            <BsTwitter />
          </a>
          <a href="https://linkedin.com">
            <SiLinkedin />
          </a>
          <a href="https://youtube.com">
            <BsYoutube />
          </a>
          <a href="https://facebook.com">
            <FaFacebookF />
          </a>
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>Qualtiy</span>
          <span>Help</span>
          <span>Share</span>
          <span>Carrers</span>
          <span>Testimonials</span>
          <span>Work</span>
        </div>
        <div className="footer-section-columns">
          <span>9876543210</span>
          <span>Chitkara University</span>
          <span>Rajpura,Punjab</span>
          <span>foodie@gmail.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;


// import React from "react";
// import Logo from "../Assets/Logo.svg";
// import { BsTwitter } from "react-icons/bs";
// import { SiLinkedin } from "react-icons/si";
// import { BsYoutube } from "react-icons/bs";
// import { FaFacebookF } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <div className="footer-wrapper">
//       <div className="footer-section-one">
//         <div className="footer-logo-container">
//           <img src={Logo} alt="" />
//         </div>
//         <div className="footer-icons">
//           <BsTwitter />
//           <SiLinkedin />
//           <BsYoutube />
//           <FaFacebookF />
//         </div>
//       </div>
//       <div className="footer-section-two">
//         <div className="footer-section-columns">
//           <span>Qualtiy</span>
//           <span>Help</span>
//           <span>Share</span>
//           <span>Carrers</span>
//           <span>Testimonials</span>
//           <span>Work</span>
//         </div>
//         <div className="footer-section-columns">
//           <span>9876543210</span>
//           <span>Chitkara University</span>
//           <span>Rajpura,Punjab</span>
//           <span>foodie@gmail.com</span>
//         </div>
//         <div className="footer-section-columns">
//           <span>Terms & Conditions</span>
//           <span>Privacy Policy</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;