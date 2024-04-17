import React from "react";
import "./Header.css";
import Icon from "../../assets/react.svg";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setSearchValue } from "../../Store/StoreSlices/StoreSlices";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchValue, addedItems } = useAppSelector((state) => state.products);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchValue);
  };
  return (
    <header>
      <nav>
        <ul>
          <Link to={"/"}>
            <img className="headerIcon" src={Icon} alt="" />
            <h1>Alinur Store</h1>
          </Link>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Type Product Name"
              className="search_input"
              onChange={handleSearch}
              value={searchValue}
            />
            <button type="submit" className="search">
              Search
            </button>
          </form>
          <Link to={"/add"} className="link_add">
            <button className="ui-change-btn">
              You Added <span>{addedItems.length}</span>{" "}
              {addedItems.length <= 1 ? "item" : "items"}
            </button>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
