import config from '../../config.json'
import fetch from 'node-fetch'

export default async function({currency, amount}) {
  const targetUrl = `${config.convApiEndpoint}&apiKey=${config.apiKey}&q=USD_${currency}`;
  const result = await (await fetch(targetUrl)).json();
  const response = amount * result[`USD_${currency}`];
  return { converted: response };
}