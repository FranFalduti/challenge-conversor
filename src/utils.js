export const URL_API = 'https://api.vatcomply.com/rates';
export const LINK_EURO = 'https://www.xe.com/currency/eur-euro/';
export const LINK_DOLLAR = 'https://www.xe.com/currency/usd-us-dollar/';

export const validador = (moneda) => {
    if (moneda === 'Euro') {
        return 'EUR';
    }
    if (moneda === 'Dollars') {
        return 'USD'
    }
};

export async function fetchData(params) {
    try {
        const response = await fetch(`${URL_API}?base=${params.base}&symbols=${params.symbols}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            params,
        });
        if (!response.ok) {
            throw new Error('Error en la respuesta');
        }
        const datos = await response.json();
        
        return datos;

    } catch (error) {
        return 'Fallo en la transacción';
    }
}