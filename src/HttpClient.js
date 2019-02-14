import fetch from 'cross-fetch';

// example base path for backend api call
const BASE_PATH = 'https://backbone.com/public/index.php';

class HttpClient {
    // format the body content using encodeURIComponent
    static formatBodyContent = (body) => {
        if (body) {
          return Object.keys(body)
            .map(k => {
              if (Array.isArray(body[k])) {
                // for object in array: make a separate encoding for each with an appended []
                // for each component in the key
                return body[k].map(i => {
                  return `${encodeURIComponent(k.concat('[]'))}=${encodeURIComponent(i)}`;
                }).join('&');
              }
              return `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`;
            })
            .join('&');
        }
        return '';
    };
    
    // generate a custom header as needed for authorization tokens
    static generateCustomHeaders = (token) => {
        if (token) {
          return {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}` // eslint-disable-line quote-props
          };
        }
        return {
          'Content-Type': 'application/x-www-form-urlencoded'
        };
    }
    
    // GET data back from database - this would return what is currently stored in data.json
    static get = ({ path, token }) => {
        return fetch(`${BASE_PATH}${path}`, {
          method: 'GET',
          headers: HttpClient.generateCustomHeaders(token)
        })
          .then(res => res.json())
          .then(resJson => resJson)
          .catch(err => err);
    }
    
    // PUT data call to update the price of the item
    static putFormData = ({ path, body, token }) => {
        return fetch(`${BASE_PATH}${path}`, {
          method: 'PUT',
          headers: HttpClient.generateCustomHeaders(token),
          body: HttpClient.formatBodyContent(body)
        })
          .then(res => res.json())
          .then(resJson => resJson)
          .catch(err => err);
    }
    
    // DELETE call to delete an item from the database
    static deleteFormData = ({ path, body, token }) => {
    return fetch(`${BASE_PATH}${path}`, {
        method: 'DELETE',
        headers: HttpClient.generateCustomHeaders(token),
        body: HttpClient.formatBodyContent(body)
    })
        .then(res => res.json())
        .then(resJson => resJson)
        .catch(err => err);
    }
}
    
export default HttpClient;
