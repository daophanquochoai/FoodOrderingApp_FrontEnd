import Cookies from 'js-cookie';

export const setCookies = (key: string, value: any, time: number) => {
    Cookies.set(key, value, {
        expires: time,
        secure: false,
        sameSite: 'Strict',
    });
};

export const getCookies = (key: string) => {
    return Cookies.get(key);
};

export const deleteCookies = (key: string) => {
    Cookies.remove(key);
};
