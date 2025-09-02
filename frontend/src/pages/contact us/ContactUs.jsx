import React, { useState } from "react";
import "./ContactUs.css";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function ContactUs() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (hook this to backend)");
    setForm({ firstName: "", lastName: "", email: "", countryCode: "+91", phone: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h2 className="page-title">Contact Us</h2>

      <div className="contact-grid">
        {/* Left column → form */}
        <form className="left-form" onSubmit={handleSubmit}>
          <h3>Send us a message</h3>
          <p>Do you have a question? A complaint? Or need any help to choose the right product? Feel free to contact us.</p>

          <div className="row">
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>

          <div className="row">
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <div className="row phone">
              <select name="countryCode" value={form.countryCode} onChange={handleChange}>
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Contact Number"
              />
            </div>
          </div>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message"
            rows="5"
            required
          />

          <button type="submit" className="btn-send">Send a Message</button>
        </form>

        {/* Right column → contact details */}
        <div className="right-card">
          <h4>Hi! We are always here to help you.</h4>

          <a href="tel:+918527716901" className="contact-item">
            <FaPhoneAlt className="icon" />
            <div>
              <div className="muted">Call Us</div>
              <div className="strong">+918527716901</div>
            </div>
          </a>

          <a href="https://wa.me/918527716901" target="_blank" rel="noopener noreferrer" className="contact-item">
            <FaWhatsapp className="icon" />
            <div>
              <div className="muted">SMS / Whatsapp</div>
              <div className="strong">+918527716901</div>
            </div>
          </a>

          <a href="mailto:medalertai@gmail.com" className="contact-item">
            <FaEnvelope className="icon" />
            <div>
              <div className="muted">Email</div>
              <div className="strong">medalertai@gmail.com</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
