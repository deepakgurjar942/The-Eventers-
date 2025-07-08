import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TicketForm = () => {
  const [formData, setFormData] = useState({
    ticketName: "",
    price: "800",
    quantity: 1,
    ticketCategory: "",
    ticketType: "",
    seatingInfo: "",
    accessLevel: "",
    ageRestriction: "15",
    venueName: "",
    venueAddress: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const categoryPrices = {
    VIP: 1500,
    General: 800,
    "Early Bird": 500,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Dynamic pricing and quantity behavior
    if (name === "ticketCategory") {
      setFormData((prev) => ({
        ...prev,
        ticketCategory: value,
        price: categoryPrices[value] || "800",
      }));
    } else if (name === "ticketType") {
      let quantity = 1;
      if (value === "Couple") quantity = 2;
      else if (value === "Group") quantity = 5;

      setFormData((prev) => ({
        ...prev,
        ticketType: value,
        quantity: quantity,
      }));
    } else if (name === "quantity") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const isQuantityDisabled =
    formData.ticketType === "Couple" || formData.ticketType === "Group";

  const validate = () => {
    const newErrors = {};
    if (!formData.ticketName) newErrors.ticketName = "Ticket name is required";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0)
      newErrors.price = "Valid ticket price is required";
    if (formData.quantity < 1) newErrors.quantity = "Minimum 1 ticket required";
    if (!formData.ticketCategory)
      newErrors.ticketCategory = "Ticket category is required";
    if (!formData.ticketType) newErrors.ticketType = "Ticket type is required";
    if (!formData.seatingInfo)
      newErrors.seatingInfo = "Seating info is required";
    if (!formData.accessLevel)
      newErrors.accessLevel = "Access level is required";
    if (!formData.venueName) newErrors.venueName = "Venue name is required";
    if (!formData.venueAddress)
      newErrors.venueAddress = "Venue address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      toast.success("🎉 Ticket submitted successfully!");

      console.log("Submitted Ticket:", formData);

      setFormData({
        ticketName: "",
        price: "800",
        quantity: 1,
        ticketCategory: "",
        ticketType: "",
        seatingInfo: "",
        accessLevel: "",
        ageRestriction: "15",
        venueName: "",
        venueAddress: "",
      });

      setErrors({});
    }
  };

  const totalPrice =
    formData.price && formData.quantity
      ? parseInt(formData.price) * parseInt(formData.quantity)
      : 0;

  return (
    <>
      <div>
        <h1 className="text-3xl text-center font-bold  bg-clip-text text-blue-950">
          Make Your Dreams Come True <br />
          Meet Your Favourite Artists, Influencers, Actors & Parties
        </h1>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-pink-200 rounded-lg shadow-md p-8 w-full max-w-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
            Sell Tickets
          </h2>

          {/* Ticket Name */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Ticket Name
            </label>
            <input
              type="text"
              name="ticketName"
              value={formData.ticketName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                errors.ticketName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.ticketName && (
              <p className="text-red-500 text-sm mt-1">{errors.ticketName}</p>
            )}
          </div>

          {/* Ticket Category */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Ticket Category
            </label>
            <select
              name="ticketCategory"
              value={formData.ticketCategory}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                errors.ticketCategory ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Category</option>
              <option value="VIP">VIP</option>
              <option value="General">General</option>
              <option value="Early Bird">Early Bird</option>
            </select>
            {errors.ticketCategory && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ticketCategory}
              </p>
            )}
          </div>

          {/* Ticket Type */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Ticket Type
            </label>
            <select
              name="ticketType"
              value={formData.ticketType}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                errors.ticketType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Type</option>
              <option value="Single">Single</option>
              <option value="Couple">Couple</option>
              <option value="Group">Group</option>
              <option value="Multi Entry">Multi Entry</option>
            </select>
            {errors.ticketType && (
              <p className="text-red-500 text-sm mt-1">{errors.ticketType}</p>
            )}
          </div>

          {/* Seating Info */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Seating Info
            </label>
            <input
              type="text"
              name="seatingInfo"
              value={formData.seatingInfo}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                errors.seatingInfo ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.seatingInfo && (
              <p className="text-red-500 text-sm mt-1">{errors.seatingInfo}</p>
            )}
          </div>

          {/* Access Level (Dropdown) */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Access Level
            </label>
            <select
              name="accessLevel"
              value={formData.accessLevel}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                errors.accessLevel ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Access</option>
              <option value="Backstage">Backstage</option>
              <option value="Main Event">Main Event</option>
              <option value="Parking">Parking</option>
            </select>
            {errors.accessLevel && (
              <p className="text-red-500 text-sm mt-1">{errors.accessLevel}</p>
            )}
          </div>

          {/* Age Restriction */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Age Restriction (Years)
            </label>
            <input
              type="number"
              name="ageRestriction"
              value={formData.ageRestriction}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Venue Name */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Venue Name
            </label>
            <input
              type="text"
              name="venueName"
              value={formData.venueName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                errors.venueName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.venueName && (
              <p className="text-red-500 text-sm mt-1">{errors.venueName}</p>
            )}
          </div>

          {/* Venue Address */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Venue Address
            </label>
            <textarea
              name="venueAddress"
              value={formData.venueAddress}
              onChange={handleChange}
              rows="2"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 border-gray-300 ${
                errors.venueAddress ? "border-red-500" : ""
              }`}
            ></textarea>
            {errors.venueAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.venueAddress}</p>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              disabled={isQuantityDisabled}
              className={`w-full px-4 py-2 border rounded-md ${
                isQuantityDisabled ? "bg-gray-100" : ""
              } focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.quantity ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
            )}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Total Price */}
          <div className="mb-6 text-right font-semibold text-gray-700">
            Total Price:{" "}
            <span className="text-pink-500">
              ₹{totalPrice.toLocaleString()}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-pink-500 to-yellow-500 hover:opacity-90 transition"
          >
            Submit Ticket
          </button>

          {submitted}
        </form>

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </>
  );
};

export default TicketForm;
