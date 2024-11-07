// src/components/BookingForm.js
//------------------------------------------
// import { useState } from "react";

// const BookingForm = () => {
//   const [formValues, setFormValues] = useState({
//     name: "",
//     email: "",
//     date: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formValues.name.trim()) {
//       newErrors.name = "Name is required";
//     }
//     if (!formValues.email.includes("@")) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!formValues.date) {
//       newErrors.date = "Booking date is required";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       alert("Booking successful!");
//       // Handle successful booking logic (e.g., API call)
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formValues.name}
//           onChange={handleChange}
//         />
//         {errors.name && <p className="error">{errors.name}</p>}
//       </div>

//       <div>
//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           value={formValues.email}
//           onChange={handleChange}
//         />
//         {errors.email && <p className="error">{errors.email}</p>}
//       </div>

//       <div>
//         <label>Booking Date</label>
//         <input
//           type="date"
//           name="date"
//           value={formValues.date}
//           onChange={handleChange}
//         />
//         {errors.date && <p className="error">{errors.date}</p>}
//       </div>

//       <button type="submit">Book Now</button>
//     </form>
//   );
// };

// export default BookingForm;
//----------------------------------------
import { useState } from "react";
import { useDispatch } from "react-redux";
import { bookCamper } from "../../redux/campersSlice.js";

export const BookingForm = ({ camperId }) => {
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [bookingMessage, setBookingMessage] = useState("");
  const dispatch = useDispatch();

  const handleBooking = () => {
    const bookingData = {
      camperId,
      startDate: dates.startDate,
      endDate: dates.endDate,
    };
    dispatch(bookCamper(bookingData)); // Викликаємо дію для бронювання
    setBookingMessage("Booking confirmed!");
    setDates({ startDate: "", endDate: "" });
  };

  return (
    <div>
      <h3>Book This Camper</h3>
      <input
        type="date"
        value={dates.startDate}
        onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
        placeholder="Start Date"
      />
      <input
        type="date"
        value={dates.endDate}
        onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
        placeholder="End Date"
      />
      <button onClick={handleBooking}>Book Now</button>
      {bookingMessage && <p>{bookingMessage}</p>}
    </div>
  );
};
