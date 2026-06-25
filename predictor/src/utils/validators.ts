export const validateEmail = (email: string) => {
  const regex = /^[Aa][0-9]{8}@alumnos\.uady\.mx$/;
  return regex.test(email);
};

export const validatePasswordMatch = (pass: string, confirm: string) => {
  return pass === confirm;
};

export const validateSemester = (semestre: string) => {
  const num = Number(semestre);
  return !isNaN(num) && num >= 1 && num <= 10;
};