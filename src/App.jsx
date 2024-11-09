//src/App.jsx
import { Routes, Route } from "react-router-dom";
// import { Header } from "./components/Header/Header.jsx";
import { HomePage } from "./pages/HomePage/HomePage.jsx";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage.jsx";
import { CamperPage } from "./pages/CamperPage/CamperPage.jsx";
import { BookingForm } from "./components/BookingForm/BookingForm.jsx";
import "./App.css";

function App() {
  return (
    <div>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campers" element={<BookingForm />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperPage />} />
      </Routes>
    </div>
  );
}

export default App;
