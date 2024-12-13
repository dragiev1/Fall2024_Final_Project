/** @type {{ replies: Reply[] }} */
const data = require("../data/users.json");
const { getConnection } = require("./supabase"); // Database
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../client/src/models/replies").Reply} Reply
 */

/**
 * Get all replies
 * @returns {Promise<DataListEnvelope<Reply>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("replies")
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
 * Get a reply by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Reply>>}
 */
async function get(id) {
  const { data, error } = await conn
    .from("replies")
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
 * Add a new reply
 * @param {Reply} reply
 * @returns {Promise<DataEnvelope<Reply>>}
 */
async function add(reply) {
  const { data, error } = await conn
    .from("replies")
    .insert([
      {
        userId: reply.userId,
        reviewId: reply.reviewId,
        text: reply.text,
        author: reply.author,
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
  if (!data.replies || !Array.isArray(data.replies)) {
    console.error("No replies data found in users.json");
    throw new Error("Invalid or missing replies data.");
  }

  for (const replies of data.replies) {
    try {
      await add(replies);
    } catch (error) {
      console.error("Error seeding reply:", replies, error);
    }
  }
}

/**
 * Update a replies
 * @param {number} id
 * @param {Reply} reply
 * @returns {Promise<DataEnvelope<Reply>>}
 */
async function update(id, reply) {
  const { data, error } = await conn
    .from("replies")
    .update({
      userId: reply.userId,
      reviewId: reply.reviewId,
      text: reply.text,
      author: reply.author,
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
 * Remove a reply
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const { data, error } = await conn
    .from("replies")
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
