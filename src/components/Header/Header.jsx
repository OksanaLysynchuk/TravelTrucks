import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

export const Header = () => {
  return (
    <div className={css.headercontainer}>
      <header className={css.header}>
        <div className={css.navcontainer}>
          <nav className={css.navigation}>
            <NavLink to="/" className={css.logolink}>
              <svg width="136" height="15">
                <use href="/public/sprite.svg#icon-TravelTrucks"></use>
              </svg>
            </NavLink>
            <div className={css.listcontainer}>
              <ul className={css.list}>
                <li className={css.listitem}>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? `${css.listlink} ${css.active}` : css.listlink
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className={css.listitem}>
                  <NavLink
                    to="/catalog"
                    className={({ isActive }) =>
                      isActive ? `${css.listlink} ${css.active}` : css.listlink
                    }
                  >
                    Catalog
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};
