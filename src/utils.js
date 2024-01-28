export const URL_API = 'https://api.vatcomply.com/rates';

export const validador = (moneda) => {
    if(moneda === 'Euro') {
        return 'EUR';
    }
    if(moneda === 'Dollars') {
        return 'USD'
    }
};

export function fetchData(params) {
    if (!params.base) {
        throw new Error("El parámetro `base` debe estar completo");
    }

    if (!params.symbols) {
        throw new Error("El parámetro `symbols` debe estar completo");
    }

    return fetch(`${URL_API}?base=${params.base}&symbols=${params.symbols}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        params,
    })
        .then((response) => response.json())
        .then((data) => data);
};