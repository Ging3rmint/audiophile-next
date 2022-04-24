const { products } = require("../data.json");

const handler = (req: any, res: any) => {
  const product = products.find((p: any) => p.slug === req.query.slug);

  if (req.method === "GET") {
    res.status(200).json(product);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};

export default handler;
