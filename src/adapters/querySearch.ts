import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

var get: Method = "GET"

var options: AxiosRequestConfig = {
    method: get,
    headers: {
      'x-rapidapi-key': 'a60b62e006msh2beb199b0b9281ep1bb734jsnf31e6ce09e99',
      'x-rapidapi-host': 'keyword-analysis.p.rapidapi.com'
    }
  };

async function querySearch (query: string, url: string): Promise<AxiosResponse<Object>> {
    let response: AxiosResponse<Object> = {
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
            params: {q: `${query}`, pageNumber: '1', pageSize: '10', withThumbnails: 'false', location: 'us'},
        })
    } catch(e) {
        if (e.response) {
            console.log(e.response.data)
        }
        if (e.request) {
            console.log(e.request.data)
        } else {
            console.log("Error", e.message)
        }
    }
    return response;
}


export { querySearch } 