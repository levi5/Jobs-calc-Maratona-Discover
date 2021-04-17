import bcrypt from 'bcrypt'

export async function hashPassword(password, saltRounds = 10) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
  return null;
};