export const setCookie = (name, value, expireTime) => {
  document.cookie = `${name}=${value};path=/;expires=${new Date(expireTime).toGMTString()}`;
};

export const getCookie = (key) => {
  const cookieEqual = key + '=';
  const cookieArray = decodeURIComponent(document.cookie).split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let singleCookie = cookieArray[i];
    singleCookie = singleCookie.replace(/^\s+/g, '');
    if (singleCookie.indexOf(cookieEqual) === 0) {
      return singleCookie.substring(cookieEqual.length, singleCookie.length);
    }
  }
  return '';
};

export const delCookie = (name) => {
  document.cookie = `${name}=null;path=/;max-age=0`;
};
