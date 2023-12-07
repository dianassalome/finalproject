// 'use server'

const Cookies = require("js-cookie");

export const setCookies = async (name: string, value: string) => {
  Cookies.set(name, value);
};

export const getCookies = async (name: string) => {
  return Cookies.get(name);
};

export const deleteCookies = async (name: string) => {
  Cookies.remove(name, { path: '' })
}
