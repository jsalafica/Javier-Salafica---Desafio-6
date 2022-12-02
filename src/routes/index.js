import { Router } from "express";

const router = Router();
const products = [
  {
    name: "Auto",
    price: 100,
    thumbnail:
      "https://cdn4.iconfinder.com/data/icons/jetflat-2-vehicles-vol-1/60/001_028_car_auto_automobile_vehicle_transport-256.png",
  },
  {
    name: "Helicoptero",
    price: 10500,
    thumbnail:
      "https://cdn2.iconfinder.com/data/icons/funtime-mechanics/60/001_020_helicopter_vehicle_transport_travel-256.png",
  },
  {
    name: "Barco",
    price: 13450,
    thumbnail:
      "https://cdn0.iconfinder.com/data/icons/summer-holidays-25/32/Boat-256.png",
  },
];
router.get("/", (req, res) => {
  res.render("productForm");
});

router.post("/productos", (req, res) => {
  const { name, price, thumbnail } = req.body;

  products.push({ name, price, thumbnail });

  res.redirect("/");
});

router.get("/productos", (req, res) => {
  if (products.length > 0) {
    res.render("products", { products, hasAny: true });
  } else {
    res.render("products", { hasAny: false });
  }
});

export default router;
