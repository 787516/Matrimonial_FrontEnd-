import React from "react";
import "./Footer.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footerDiv ">
        <div className="row g-5">

          {/* LEFT: MAP */}
          <div className="col-lg-5">
            <h2 className="section-title">Our Directions</h2>

            <img
              className="map-image"
              src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&h=450"
              alt="Map"
            />
          </div>

          {/* RIGHT: CONTACT FORM + INFO */}
          <div className="col-lg-7">
            <h2 className="section-title">Get In Touch</h2>

            <p className="contact-intro">
              If you have any questions about the services we provide simply use the form.
              We try to respond within 24 hours.
            </p>

            {/* Contact Form */}
            <form
              className="footer-form mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form submitted successfully!");
                e.target.reset();
              }}
            >
              <div className="row g-3">
                <div className="col-md-6">
                  <input className="form-control" placeholder="Enter Name" required />
                </div>
                <div className="col-md-6">
                  <input className="form-control" placeholder="Enter Email" required />
                </div>
              </div>

              <div className="row g-3 mt-2">
                <div className="col-md-6">
                  <input className="form-control" placeholder="Enter ID" required />
                </div>
                <div className="col-md-3">
                  <button type="submit" className="btn-submit w-100">
                    Submit
                  </button>
                </div>
              </div>
            </form>

            {/* Contact Info */}
            <div className="contact-item">
              <FaPhone /> <span>9011362547 / 9326602692</span>
            </div>

            <div className="contact-item">
              <FaEnvelope /> <span>sanyogvadhuvat@yahoo.com</span>
            </div>

            <div className="contact-item">
              <FaMapMarkerAlt />
              <span>
                SnehaBandh Office, Skyline Corporate Plaza,
                <br /> Kothrud, Pune - 411038
              </span>
            </div>

            {/* Links */}
            <div className="footer-links">
              <a href="#">FAQ</a>
              <a href="#">Terms & Condition</a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom mt-4">
          <div className="row align-items-center">

            <div className="col-md-6 footer-copy">
              © 2025 SnehaBandh.com. All Rights Reserved.
            </div>

            <div className="col-md-6">
              <div className="social-links">
                <a href="#"><FaFacebookF /></a>
                <a href="#" className="ms-4"><FaXTwitter /></a>
                <a href="#" className="ms-4"><FaInstagram /></a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
