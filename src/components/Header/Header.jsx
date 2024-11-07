//src/components/Header/Header.jsx
export const Header = () => {
  return (
    <div>
      <header>
        <svg width="24" height="24">
          <use href="/src/assets/TravelTrucks.svg" />
        </svg>
        <a href="../../pages/HomePage">Home</a>
        <a href="../../pages/CatalogPage">Catalog</a>
      </header>
    </div>
  );
};
