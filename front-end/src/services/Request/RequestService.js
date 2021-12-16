import axios from "axios";

const API_URL = "http://localhost:4001/request";
 
class RequestService {
  
  get(token) {
    let config = {
        headers: {
          'x-access-token': token,
        }
      } 
    return axios
      .get(API_URL,config)
      .then((response) => {
        if (response.data) {
          localStorage.setItem("requests", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  handle(token, id, type) {
      const headers = {
        'x-access-token': token,
      }

    return axios
      .post(API_URL + "/handle", { id, type }, { headers: headers })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("requests", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
}

export default new RequestService();