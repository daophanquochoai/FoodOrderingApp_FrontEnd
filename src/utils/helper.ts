export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateName = (name: string) => {
  const regex = /^[a-zA-ZÀ-Ỹà-ỹ\s]+$/;
  return regex.test(name);
};
