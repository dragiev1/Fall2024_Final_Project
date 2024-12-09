/** @type {{ items: Product[] }} */
const data = require("../data/products.json");
const { getConnection } = require("./supabase"); // Database
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../client/src/models/products").Product} Product
 */

/**
 * Get all products
 * @returns {Promise<DataListEnvelope<Product>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("products")
    .select("*", { count: "estimated" });
    console.log("Data:", data);
    console.log("Error:", error);
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

/**
 * Get a product by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Product>>}
 */
async function get(id) {
  const { data, error } = await conn
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Add a new product
 * @param {Product} product
 * @returns {Promise<DataEnvelope<Product>>}
 */
async function add(product) {
  const { data, error } = await conn
    .from("products")
    .insert([
      {
        title: product.title,
        images: product.images,
        description: product.description,
        category: product.category,
        price: product.price,
        minimumOrderQuantity: product.minimumOrderQuantity,
      },
    ])
    .select("*")
    .single();

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

async function seed() {
  for (const product of data.items) {
    await add(product);
  }
}

/**
 * Update a product
 * @param {number} id
 * @param {Product} product
 * @returns {Promise<DataEnvelope<Product>>}
 */
async function update(id, product) {
  const { data, error } = await conn
    .from("products")
    .update({
      title: product.title,
      images: product.images,
      description: product.description,
      category: product.category,
      price: product.price,
      minimumOrderQuantity: product.minimumOrderQuantity,
    })
    .eq("id", id)
    .select("*");

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Remove a product
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const { data, error } = await conn
    .from("products")
    .delete()
    .eq("id", id)
    .select("*")
    .single();

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

module.exports = {
  getAll,
  get,
  add,
  update,
  seed,
  remove,
};
