import React, { useState } from "react";
import img3 from "./../../public/assets/img3.png";
import { Navbar } from "./Navbar";

export const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [contactData, setContactData] = useState({ nameC: "", emailC: "", message: "" });

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/Contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      window.location.reload();
    })
    .catch((error) => {
      console.log("Error:", error);
      alert("Failed to send message");
    });
  };

  return (
    <>
      {!showForm ? (
        <div className='relative w-full h-screen'>
          <img src={img3} className="object-cover w-full h-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-white text-7xl font-bold mb-4">Contact</h1>
            <button
              onClick={handleButtonClick}
              className="bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-400"
            >
              Question?
            </button>
          </div>
        </div>
      ) : (
        <div className='relative w-full h-screen'>
          <img src={img3} className="object-cover w-full h-full opacity-30" />
          <div className="pt-11 absolute inset-0 flex flex-col items-center justify-center">
          <Navbar/>
            <div className="flex flex-col">
              <div className="px-96 mt-11 pt-11 w-full items-center justify-center h-screen">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      name="nameC"
                      placeholder="Your Name"
                      className="w-full px-3 py-2 border rounded"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="emailC"
                      placeholder="Your Email"
                      className="w-full px-3 py-2 border rounded"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Message</label>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      className="w-full px-3 py-2 border rounded"
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-400"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
