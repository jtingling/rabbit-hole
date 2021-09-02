import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

var get: Method = "GET"

var options: AxiosRequestConfig = {
    method: get,
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPID_KEY,
      'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
    }
  };

async function searchWeb (query: string, url: string, page: number = 1){
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
            params: {q: `${query}`, pageNumber: `${page}`, pageSize: '10', withThumbnails: 'false', location: 'us'},
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


export { searchWeb } 