import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IProducts, getAllProducts } from "../../Store/StoreSlices/StoreSlices";
import "./Products.css";
import CardProducts from "./CardProducts";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="card_body">
      {products.map((el) => (
        <CardProducts key={el.id} {...el} />
      ))}
    </div>
  );
};

export default Products;
