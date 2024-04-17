import axios from "axios";

const instance = axios.create({
  baseURL: "https://fakestoreapi.com/",
});

export const ProductsAPI = {
  getAllProducts() {
    return instance.get("products");
  },
};
