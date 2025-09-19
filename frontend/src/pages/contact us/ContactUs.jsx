import React, { useState } from "react";
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
    <div className="min-h-screen text-white pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <header className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Contact Us</h2>
          <p className="mt-2 text-white/90 max-w-2xl mx-auto text-sm">
            Have questions or need help choosing the right product? Send us a message — we’re here to help.
          </p>
        </header>

        {/* Grid: form (2 cols) + contact card (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: form (span 2 on large screens) */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 rounded-3xl p-8 bg-white text-neutral-900 border border-gray-200 shadow-lg"
            style={{ borderTopWidth: 6, borderTopColor: "#4F6FFE" }}
          >
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Send us a message</h3>
            <p className="text-neutral-700 mb-6 text-sm">
              Tell us how we can help — questions, feedback, or anything else.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="flex-1 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#4F6FFE]/30"
              />
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#4F6FFE]/30"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="flex-1 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#4F6FFE]/30"
              />

              <div className="flex gap-3 md:w-[320px] w-full">
                <select
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleChange}
                  className="w-28 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-neutral-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F6FFE]/30"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#4F6FFE]/30"
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
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-neutral-900 resize-none focus:outline-none focus:ring-2 focus:ring-[#4F6FFE]/30 mb-4"
            />

            <button
              type="submit"
              className="inline-flex items-center px-6 py-2 rounded-full font-semibold bg-[#4F6FFE] text-white hover:brightness-105 transition"
            >
              Send a Message
            </button>
          </form>

          {/* Right: contact card */}
          <aside
            className="rounded-3xl p-6 backdrop-blur-md bg-white/6 border border-white/10 shadow-lg flex flex-col gap-4"
            style={{ borderTopWidth: 6, borderTopColor: "#4F6FFE" }}
          >
            <h4 className="text-lg font-semibold text-white/95">Hi! We are always here to help you.</h4>

            <a href="tel:+918527716901" className="flex items-center gap-4 p-3 rounded-lg bg-white/6 hover:bg-white/12 transition">
              <FaPhoneAlt className="text-white text-xl" />
              <div>
                <div className="text-xs text-white/80">Call Us</div>
                <div className="font-semibold text-white">+91 85277 16901</div>
              </div>
            </a>

            <a
              href="https://wa.me/918527716901"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-3 rounded-lg bg-white/6 hover:bg-white/12 transition"
            >
              <FaWhatsapp className="text-white text-xl" />
              <div>
                <div className="text-xs text-white/80">SMS / Whatsapp</div>
                <div className="font-semibold text-white">+91 85277 16901</div>
              </div>
            </a>

            <a href="mailto:medalertai@gmail.com" className="flex items-center gap-4 p-3 rounded-lg bg-white/6 hover:bg-white/12 transition">
              <FaEnvelope className="text-white text-xl" />
              <div>
                <div className="text-xs text-white/80">Email</div>
                <div className="font-semibold text-white">medalertai@gmail.com</div>
              </div>
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
