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
        images: product.images,
        id: product.id,
        description: product.description,
        category: product.category,
        price: product.price,
        tags: product.tags,
        brand: product.brand,
        weight: product.weight,
        dimensions: product.dimensions,
        returnPolicy: product.returnPolicy,
        minimumOrderQuantity: product.minimumOrderQuantity,
        thumbnail: product.thumbnail,
      },
    ])
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
  const userToUpdate = await get(id);
  Object.assign(userToUpdate.data, product);
  return {
    isSuccess: true,
    data: userToUpdate.data,
  };
}

/**
 * Remove a product
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const itemIndex = data.items.findIndex((product) => product.id == id);
  if (itemIndex === -1)
    throw { isSuccess: false, message: "Item not found", data: id };
  data.items.splice(itemIndex, 1);
  return { isSuccess: true, message: "Item deleted", data: id };
}

module.exports = {
  getAll,
  get,
  add,
  update,
  seed,
  remove,
};
