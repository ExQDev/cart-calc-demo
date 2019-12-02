import config from '../../config.json'
import fetch from 'node-fetch'

export default async function({currency}) {
  const targetUrl = `${config.convApiEndpoint}&apiKey=${config.apiKey}&q=USD_${currency}`;
  const result = await (await fetch(targetUrl)).json();
  const response = result[`USD_${currency}`];
  return { 
    products: config.availableProducts.map(prod => ({
      ...prod, 
      price: (prod.priceInUSD * response).toFixed(2) ,
      currency
    })) 
  };
}