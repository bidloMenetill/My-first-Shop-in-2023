import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  IProducts,
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "../../Store/StoreSlices/StoreSlices";
import "./AddProducts.css";

const AddProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { addedItems } = useAppSelector((state) => state.products);

  const handleRemoveItem = (item: IProducts) => {
    dispatch(removeItem(item));
  };

  const handleAddQuantity = (item: IProducts) => {
    dispatch(incrementQuantity(item.id));
  };

  const handleSubtractQuantity = (item: IProducts) => {
    dispatch(decrementQuantity(item.id));
  };

  const calculateTotalPrice = () =>
    addedItems
      .reduce(
        (total, item) =>
          total +
          (typeof item.price === "number" ? item.price : 0) *
            (item.addNumber || 1),
        0
      )
      .toFixed(2);

  return (
    <div className="add-products-container">
      <h2 className="addedProducts">Your Added Products</h2>
      <ul className="addProductsUl">
        {addedItems.map((item) => (
          <div key={item.id} className="added-product">
            <div className="card_parent">
              <div className="card_add">
                <button
                  className={"remove-button"}
                  onClick={() => handleRemoveItem(item)}
                >
                  ✖
                </button>
                <img className="card__img" src={item.image} alt="" />
                <div>
                  <h2>{item.category}</h2>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
                <div className="card-price-add">
                  <span>Price : ${item.price}</span>
                  <div className="quantity-control">
                    <button onClick={() => handleSubtractQuantity(item)}>
                      -
                    </button>
                    <span>{item.addNumber}</span>
                    <button onClick={() => handleAddQuantity(item)}>+</button>
                  </div>
                  <button className={"add-item-btn"}>Add</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
      <h1 className="total">Total price: ${calculateTotalPrice()}</h1>
    </div>
  );
};

export default AddProducts;
