import axios from "axios";

const API_URL = "http://localhost:4001/friend";
 
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
          localStorage.setItem("friends", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  delete(token, id) {
    const headers = {
      'x-access-token': token
    }
    return axios
      .delete(API_URL, { data: { id: id }, headers: headers } )
      .then((response) => {
        if (response.data) {
          localStorage.setItem("friends", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
}

export default new RequestService();