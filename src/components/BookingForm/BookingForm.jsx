import { useState } from "react";
import { useDispatch } from "react-redux";
import { bookCamper } from "../../redux/campersSlice.js";

export const BookingForm = ({ camperId }) => {
  const [dates, setDates] = useState({ date: "" });
  const [bookingMessage, setBookingMessage] = useState("");
  const dispatch = useDispatch();

  const handleBooking = () => {
    const bookingData = {
      camperId,
      date: dates.date,
    };
    dispatch(bookCamper(bookingData));
    setBookingMessage("Booking confirmed!");
    setDates({ date: "" });
  };

  return (
    <div>
      <h3>Book your campervan now</h3>
      <p>Stay connected! We are always ready to help you.</p>
      <input type="text" placeholder="Name*" />
      <input type="email" placeholder="Email*" />

      <input
        type="date"
        value={dates.date}
        onChange={(e) => setDates({ ...dates, date: e.target.value })}
        placeholder="Booking date*"
      />

      <textarea name="comment" id="comment" placeholder="Comment"></textarea>

      <button onClick={handleBooking}>Send</button>
      {bookingMessage && <p>{bookingMessage}</p>}
    </div>
  );
};
