//src/pages/HomePage/HomePage.jsx
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header.jsx";
export const HomePage = () => {
  const navigate = useNavigate();

  const handleViewNowClick = () => {
    navigate("/catalog");
  };
  return (
    <div>
      <Header />
      <div>
        <h1>Campers of your dreams</h1>
        <p>You can find everything you want in our catalog</p>
        <button onClick={handleViewNowClick}>View Now</button>
      </div>
    </div>
  );
};
