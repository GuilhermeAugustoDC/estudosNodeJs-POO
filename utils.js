import fs from "fs/promises";

export async function readUsers(usersJson_path) {
  try {
    const data = await fs.readFile(usersJson_path, "utf8");
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}
