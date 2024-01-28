export const URL_API = 'https://api.vatcomply.com/rates';

export const validador = (moneda) => {
    return moneda === 'Euro' ? 'EUR' : 'USD';
};