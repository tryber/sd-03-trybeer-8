const { userModel } = require('../models');

// Referência regex para validação de email:
// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
const regexName = /[a-zA-Z\s]{12,}/;
const regexEmail = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const regexPassword = /\d{6,}/;

const validateEntries = (name, email, password) => {
  if (!regexName.test(name) || !regexEmail.test(email) || !regexPassword.test(password)) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  return true;
};

/*
cadastra por padrão role client, se precisar um role administrator
é necessário passar "role":"administrato"
*/
const registerUser = async (name, email, password, role = 'client') => {
  const isEntriesValid = validateEntries(name, email, password);

  if (typeof isEntriesValid === 'object') return isEntriesValid;

  await userModel.registerUser(name, email, password, role);

  return { name, email, password, role };
};

module.exports = { registerUser };
