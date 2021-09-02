import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

var get: Method = "GET"

var options: AxiosRequestConfig = {
    method: get,
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPID_KEY,
      'x-rapidapi-host': 'keyword-analysis.p.rapidapi.com'
    }
  };

async function querySearch (query: string, url: string){
    let response: AxiosResponse<any> = {
        data: {},
        status: 404,
        statusText: 'Resource Not Found',
        headers: {},
        config: options
      };
    try {
        response = await axios.get(`${url}`,
        {
            ...options,
            params: {q: `${query}`},
        })
    } catch(e) {
        if (axios.isAxiosError(e)) {
            return e
        } else {
            console.log("Error", e.message)
        }
    }
    return response;
}


export { querySearch } 