import React, { useState } from 'react';

const Vendorform = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    serviceType: '',
    minPrice: '',
    maxPrice: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.companyName) formErrors.companyName = 'Company Name is required';
    if (!formData.contactName) formErrors.contactName = 'Contact Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Valid Email is required';
    if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone)) formErrors.phone = 'Valid 10-digit phone number is required';
    if (!formData.serviceType) formErrors.serviceType = 'Please select a service type';
    if (!formData.minPrice || isNaN(formData.minPrice)) formErrors.minPrice = 'Minimum Price is required';
    if (!formData.maxPrice || isNaN(formData.maxPrice)) formErrors.maxPrice = 'Maximum Price is required';
    if (Number(formData.minPrice) > Number(formData.maxPrice)) formErrors.maxPrice = 'Max Price should be greater than Min Price';
    if (!formData.description) formErrors.description = 'Description is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Vendor Registered:', formData);
      alert('Vendor Registered Successfully!');
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        serviceType: '',
        minPrice: '',
        maxPrice: '',
        description: '',
      });
      setErrors({});
    }
  };

  const serviceOptions = ['Catering', 'Decoration', 'Photography', 'Sound & Lighting', 'Entertainment', 'Venue'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl border border-pink-300"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
          Vendor Registration
        </h2>

        {/* Text Fields */}
        {[
          { name: 'companyName', label: 'Company Name' },
          { name: 'contactName', label: 'Contact Person' },
          { name: 'email', label: 'Email' },
          { name: 'phone', label: 'Phone Number' },
        ].map(({ name, label }) => (
          <div className="mb-4" key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors[name] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        {/* Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
              errors.serviceType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">-- Select a Service --</option>
            {serviceOptions.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
          {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
        </div>

        {/* Price Range */}
       <div className="mb-6">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Price Range:{" "}
    <span className="text-pink-500 font-semibold">
      ₹{parseInt(formData.maxPrice).toLocaleString()}
    </span>
  </label>

  <input
    type="range"
    name="maxPrice"
    min="0"
    max="200000"
    step="1000"
    value={formData.maxPrice}
    onChange={(e) =>
      setFormData({ ...formData, maxPrice: e.target.value })
    }
    className="w-full h-3 rounded-lg appearance-none cursor-pointer"
    style={{
      background: `linear-gradient(to right, #ec4899 ${
        (formData.maxPrice / 200000) * 100
      }%, #e5e7eb ${(formData.maxPrice / 200000) * 100}%)`,
    }}
  />

  {errors.maxPrice && (
    <p className="text-red-500 text-sm mt-1">{errors.maxPrice}</p>
  )}

  {/* Custom slider thumb styling */}
  <style>
    {`
      input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        height: 18px;
        width: 18px;
        border-radius: 50%;
        background: linear-gradient(to right, #ec4899, #facc15); /* pink to yellow */
        border: none;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        margin-top: -7px;
      }

      input[type="range"]::-moz-range-thumb {
        height: 18px;
        width: 18px;
        border-radius: 50%;
        background: linear-gradient(to right, #ec4899, #facc15);
        border: none;
        cursor: pointer;
      }
    `}
  </style>
</div>



        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-pink-500 to-yellow-500 hover:opacity-90 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Vendorform;
