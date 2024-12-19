/** @type {{ users: User[] }} */
const data = require("../data/users.json");
const { getConnection } = require("./supabase"); // Database
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../client/src/models/user").User} User
 */

/**
 * Get all users
 * @returns {Promise<DataListEnvelope<User>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("users")
    .select("*", { count: "estimated" });

  if (error) {
    console.error("Database error:", error);
    throw new Error("Failed to interact with the database.");
  }

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

/**
 * Get all users by search
 * @param {string} query
 * @returns {Promise<DataListEnvelope<User>>}
 */
async function searchUsers(query) {
  const { data, error } = await conn
    .from("users")
    .select("*")
    .ilike("name", `%${query}%`);

  if (error) {
    throw new Error(error.message);
  }

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Get a user by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<User>>}
 */
async function get(id) {
  const { data, error } = await conn
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Database error:", error);
    throw new Error("Failed to interact with the database.");
  }

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Add a new user
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */
async function add(user) {
  const { data, error } = await conn
    .from("users")
    .insert([
      {
        email: user.email,
        password: user.password,
        name: user.name,
        telephone: user.telephone,
        profilePicture: user.profilePicture,
        numOfReviews: user.numOfReviews,
      },
    ])
    .select("*")
    .single();

  if (error) {
    console.error("Database error:", error);
    throw new Error("Failed to interact with the database.");
  }

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

async function seed() {
  // console.log(data.users); // Debugging
  for (const user of data.users) {
    await add(user);
  }
}

/**
 * Update a user
 * @param {number} id
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */
async function update(id, user) {
  const { data, error } = await conn
    .from("users")
    .update({
      email: user.email,
      password: user.password,
      name: user.name,
      telephone: user.telephone,
      profilePicture: user.profilePicture,
      numOfReviews: user.numOfReviews,
    })
    .eq("id", id)
    .select("*");

  if (error) {
    console.error("Database error:", error);
    throw new Error("Failed to interact with the database.");
  }

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Remove a user
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const { data, error } = await conn
    .from("users")
    .delete()
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Database error:", error);
    throw new Error("Failed to interact with the database.");
  }

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

module.exports = {
  getAll,
  searchUsers,
  get,
  add,
  update,
  seed,
  remove,
};
