/** @type {{ items: Product[] }} */
const data = require("../data/products.json");

/**
 * @template T
 * @typedef {import("../../client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../client/src/models/products").Product} Product
 */

/**
 * Get all users
 * @returns {Promise<DataListEnvelope<Product>>}
 */
async function getAll() {
  return {
    isSuccess: true,
    data: data.items,
    total: data.items.length,
  };
}

/**
 * Get a user by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Product>>}
 */
async function get(id) {
  const item = data.items.find((user) => user.id == id);
  return {
    isSuccess: !!item,
    data: item,
  };
}

/**
 * Add a new user
 * @param {Product} product
 * @returns {Promise<DataEnvelope<Product>>}
 */
async function add(product) {
  product.id =
    data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  data.items.push(product);
  return {
    isSuccess: true,
    data: product,
  };
}

/**
 * Update a user
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
 * Remove a user
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
  remove,
};
