import bcrypt from 'bcrypt';

const { hash, compare } = bcrypt;

async function hashPassword(password) {
  const result = await hash(password, 10);
  return result;
}

async function comparePassword(plainPassword, hashedPassword) {
  const result = await compare(plainPassword, hashedPassword);
  return result;
}

export { hashPassword, comparePassword };
