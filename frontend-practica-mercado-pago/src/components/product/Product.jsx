import React, { useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { PUBLIC_KEY_MERCADO_PAGO, products } from "../../assets/data";
import styleProduct from "./Product.module.css";
import { utilStorage } from "../../utils";
const Product = () => {
  const [shoppingCart, setShoppingCart] = useState([]);

  const [preferenceId, setPreferenceId] = React.useState(null);
  initMercadoPago(PUBLIC_KEY_MERCADO_PAGO, {
    locale: "es-AR",
  });

  const createPreference = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/v1/preferences/create",
        {
          items: shoppingCart,
        }
      );

      const { id } = data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) setPreferenceId(id);
  };

  const fetchProducts = () => {
    const shoppingCartStorage = utilStorage.getStorage("shopping_cart");
    setShoppingCart(shoppingCartStorage);
  };

  const addProductCart = (product) => {
    setShoppingCart([...shoppingCart, { ...product, quantity: 1 }]);
    utilStorage.saveStorage("shopping_cart", [
      ...shoppingCart,
      { ...product, quantity: 1 },
    ]);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    // Products
    <div>
      <div className={styleProduct.products}>
        {
          products.map((product) => (
            <div className={styleProduct.card}>
              <div className={styleProduct.poster}>
                <img src={product.img} alt="" className={styleProduct.img} />
              </div>
              <h3 className={styleProduct.productName}>{product.name}</h3>
              <h3 className={styleProduct.price}>$ {product.unit_price}</h3>
              <button
                type="button"
                className={styleProduct.btnPrimary}
                onClick={() => addProductCart(product)}
              >
                Añadir al carrito
              </button>
            </div>
          )) // Card product
        }
      </div>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}

      {/* Buttons */}
      <div className={styleProduct.buttons}>
        <button className={styleProduct.btnSecondary} onClick={handleBuy}>
          Comprar
        </button>
        <button className={styleProduct.btnSecondary}>
          Vaciar Carrito - {shoppingCart.length}
        </button>
      </div>
    </div>
  );
};

export default Product;
