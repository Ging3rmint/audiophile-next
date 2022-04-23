const { products } = require("../data.json");

const handler = (req: any, res: any) => {
  const productsByCat = products.filter(
    (p: any) => p.category === req.query.category
  );

  if (req.method === "GET") {
    res.status(200).json(productsByCat);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};

export default handler;
