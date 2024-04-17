import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addItem, removeItem } from "../../Store/StoreSlices/StoreSlices";
import { IProducts } from "../../Store/StoreSlices/StoreSlices";
import { Link } from "react-router-dom";
import "./CardProducts.css";

const CardProducts: React.FC<IProducts> = ({
  category,
  description,
  id,
  image,
  price,
  title,
}) => {
  const dispatch = useAppDispatch();
  const { addedItems } = useAppSelector((state) => state.products);
  const isAdded = addedItems.some((item) => item.id === id);
  const buttonOnClick = () => {
    if (!isAdded) {
      dispatch(addItem({ id, title, price, description, image, category }));
    }
  };
  return (
    <div className="card_parent">
      <div className="card">
        <img className="card__img" src={image} alt="" />
        <div>
          <h2>{category}</h2>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
        <div className="card-price-add">
          <span>Price : ${price}</span>
          <button
            className={"add-item-btn"}
            style={{ display: isAdded ? "none" : "block" }}
            onClick={buttonOnClick}
          >
            Add
          </button>
          {isAdded && (
            <Link to="/add" className="link_button">
              Go to Cart
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProducts;
