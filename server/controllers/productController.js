const mongoose = require('mongoose');
const Product = require('../models/Product');

const SORT_MAP = {
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  newest: { createdAt: -1 },
  rating: { rating: -1 },
};

function buildFilter(query) {
  const filter = {};
  const { category, size, color, tag, q } = query;

  if (category) filter.category = category.toUpperCase();
  if (size) filter.sizes = size;
  if (color) {
    filter['colors.name'] = new RegExp(`^${color}$`, 'i');
  }
  if (tag) filter.tags = tag.toLowerCase();
  if (q) {
    filter.$or = [
      { title: new RegExp(q, 'i') },
      { description: new RegExp(q, 'i') },
      { tags: new RegExp(q, 'i') },
    ];
  }

  return filter;
}

exports.getProducts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 12));
    const skip = (page - 1) * limit;
    const sortKey = req.query.sort || 'newest';
    const sort = SORT_MAP[sortKey] || SORT_MAP.newest;

    const filter = buildFilter(req.query);

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);

    res.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductBySlugOrId = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    let product;

    if (mongoose.Types.ObjectId.isValid(slugOrId)) {
      product = await Product.findById(slugOrId);
    }
    if (!product) {
      product = await Product.findOne({ slug: slugOrId.toLowerCase() });
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (err) {
    next(err);
  }
};

exports.getDealOfMonth = async (_req, res, next) => {
  try {
    const products = await Product.find({ dealOfMonth: true }).limit(12);
    res.json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getNewArrivals = async (_req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(12);
    res.json({ products });
  } catch (err) {
    next(err);
  }
};
