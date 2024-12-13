/** @type {{ reviews: Review[] }} */
const data = require("../data/users.json");
const { getConnection } = require("./supabase"); // Database
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../client/src/models/reviews").Review} Review
 */

/**
 * Get all reviews
 * @returns {Promise<DataListEnvelope<Review>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("reviews")
    .select("*", { count: "estimated" });

  if (error) console.log("Error:", error);
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

/**
 * Get a review by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Review>>}
 */
async function get(id) {
  const { data, error } = await conn
    .from("reviews")
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
 * Add a new review
 * @param {Review} review
 * @returns {Promise<DataEnvelope<Review>>}
 */
async function add(review) {
  const { data, error } = await conn
    .from("reviews")
    .insert([
      {
        userId: review.userId,
        title: review.title,
        text: review.text,
        image: review.image,
        rating: review.rating,
      },
    ])
    .select("*")
    .single();

  if (error) {
    console.log("Error: ", error); // Debugging.
  }

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

async function seed() {
  if (!data.reviews || !Array.isArray(data.reviews)) {
    console.error("No reviews data found in users.json");
    throw new Error("Invalid or missing reviews data.");
  }

  for (const review of data.reviews) {
    if (
      !review.id ||
      !review.title ||
      !review.text ||
      !review.date ||
      !review.rating
    ) {
      console.error("Invalid review data:", review);
      continue; // Skip invalid reviews
    }
    try {
      await add(review);
    } catch (error) {
      console.error("Error seeding review:", review, error);
    }
  }
}

/**
 * Update a review
 * @param {number} id
 * @param {Review} review
 * @returns {Promise<DataEnvelope<review>>}
 */
async function update(id, review) {
  const { data, error } = await conn
    .from("reviews")
    .update({
      title: review.title,
      text: review.text,
      image: review?.image,
      rating: review.rating,
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
 * Remove a review
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const { data, error } = await conn
    .from("reviews")
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
