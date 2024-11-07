// src/pages/CatalogPage.jsx
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCampersThunk } from "../../redux/campersSlice";
import { CamperCard } from "../../components/CamperCard/CamperCard.jsx";
import LoadingSpinner from "../../components/Loader/Loader.jsx";

export const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, status, error, page, totalItems } = useSelector(
    (state) => state.campers
  );

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    hasAC: false,
    hasKitchen: false,
  });

  useEffect(() => {
    dispatch(fetchCampersThunk({ filters, page })); // Завантажуємо кемпери з поточними фільтрами і номером сторінки
  }, [dispatch, filters, page]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const loadMore = () => {
    dispatch(fetchCampersThunk({ filters, page: page + 1 })); // Завантажуємо наступну сторінку
  };

  // Логіка для визначення, чи є ще сторінки
  const hasMoreItems = items.length < totalItems; // Якщо кількість завантажених кемперів менше за загальну кількість

  if (status === "loading") return <LoadingSpinner />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="catalog">
      <h2>Our Campers</h2>

      {/* Filter Section */}
      <div className="filters">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={filters.type}
          onChange={handleFilterChange}
        />
        <label>
          <input
            type="checkbox"
            name="hasAC"
            checked={filters.hasAC}
            onChange={handleFilterChange}
          />
          AC
        </label>
        <label>
          <input
            type="checkbox"
            name="hasKitchen"
            checked={filters.hasKitchen}
            onChange={handleFilterChange}
          />
          Kitchen
        </label>
      </div>

      <div className="camper-list">
        {items.length > 0 ? (
          items.map((camper) => <CamperCard key={camper.id} camper={camper} />)
        ) : (
          <p>No campers available.</p>
        )}
      </div>

      {/* Load More Button */}
      {hasMoreItems && (
        <button onClick={loadMore} className="btn-load-more">
          Load More
        </button>
      )}
    </div>
  );
};
