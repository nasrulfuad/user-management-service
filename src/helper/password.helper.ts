import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error on hashing password", error);
    throw error;
  }
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compare(password, hashedPassword);
}
