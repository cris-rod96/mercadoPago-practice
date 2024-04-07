import { MercadoPagoConfig, Preference } from "mercadopago";
import { configMercadoPago } from "../config/index.js";

export const createPreference = async (req, res) => {
  const client = new MercadoPagoConfig(configMercadoPago);
  try {
    const body = {
      items: [
        {
          title: "Mi producto",
          quantity: 1,
          currency_id: "ARS",
          unit_price: 75.56,
        },
      ],
      back_urls: {
        success: "http://localhost:5173",
        pending: "http://localhost:5173",
        failure: "http://localhost:5173",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    return res.status(200).json({ id: result.id });
  } catch (error) {
    return res.status(500).json({
      msg: `Error: ${error.message}`,
    });
  }
};
