const hashPassword = (rawPassword: string): Promise<string> => {
  return Bun.password.hash(rawPassword);
};

const verifyPassword = (raw: string, hashed: string): Promise<Boolean> => {
  return Bun.password.verify(raw, hashed);
};

export { hashPassword, verifyPassword };
