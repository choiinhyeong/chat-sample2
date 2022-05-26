export const getToken = (key) => {

    // return window.sessionStorage.getItem(key);
    return window.localStorage.getItem(key);
};

export const saveToken = (key, token) => {
    // window.sessionStorage.setItem(key, token);
    window.localStorage.setItem(key, token);
};

export const destroyToken = (key) => {
    // window.sessionStorage.removeItem(key);
    window.localStorage.removeItem(key);
};

export default { getToken, saveToken, destroyToken };
