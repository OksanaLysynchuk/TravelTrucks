import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCampersThunk } from "../../redux/campersSlice";
import { Header } from "../../components/Header/Header.jsx";
import { Filters } from "../../components/Filters/Filters.jsx";
import { CampersList } from "../../components/CampersList/CampersList.jsx";
import LoadingSpinner from "../../components/Loader/Loader.jsx";
import css from "./CatalogPage.module.css";

export const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, status, error, totalItems } = useSelector(
    (state) => state.campers
  );

  // Локальні стани для фільтрів та пагінації
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    hasAC: false,
    hasKitchen: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    // При запуску або зміні фільтрів, перший раз завантажуємо сторінку
    dispatch(fetchCampersThunk({ filters, page: 1 }));
  }, [dispatch, filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // const handleSearch = () => {
  //   // Викликається, коли користувач натискає кнопку пошуку
  //   dispatch(fetchCampersThunk({ filters, page: 1 }));
  // };

  const loadMore = () => {
    if (currentPage * itemsPerPage < totalItems) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      dispatch(fetchCampersThunk({ filters, page: currentPage + 1 }));
    }
  };

  const displayedItems = items.slice(0, currentPage * itemsPerPage);
  const hasMoreItems = displayedItems.length < totalItems;

  if (status === "loading") return <LoadingSpinner />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className={css.catalog}>
      <Header />
      <div className={css.main}>
        <div className={css.filters}>
          <Filters filters={filters} onFilterChange={handleFilterChange} />
          {/* <button onClick={handleSearch} className={css.searchbtn}>
            Search
          </button> */}
        </div>
        <CampersList items={displayedItems} />
        {hasMoreItems && (
          <button onClick={loadMore} className={css.loadmore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};
