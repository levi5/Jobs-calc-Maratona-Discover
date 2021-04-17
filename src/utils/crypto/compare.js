import bcrypt from 'bcrypt'

export async function comparePassword(password, hash) {
  try {
    const valid =  await bcrypt.compare(password, hash);
    return valid
  } catch (error) {
    console.log(error);
  }
  return false;
};
