const { products } = require("./data.json");

export default function handler(req, res) {
  const productsByCat = products.filter(
    (p) => p.category === req.query.category
  );

  if (req.method === "GET") {
    res.status(200).json(productsByCat);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
}
