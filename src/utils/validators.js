export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10,}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateAge = (age) => {
  const parsedAge = parseInt(age);
  return parsedAge >= 18 && parsedAge <= 100;
};
