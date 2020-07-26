import axios from 'axios';

const BASE_URL = 'http://localhost:5555';


export function getCartData(cart){
    return axios
      .post('/api/menu',{cart})
      .then(response => response.data)
      .catch(err => {
        console.log(err);
      });
  };

  export function getProducts() {
    return axios.get('/api/menu')
      .then(response => 
        {
          console.log(response.data)
          return response.data
        });
  }


// export function placeOrder(cart){
//     return axios
//     .post('/api/order',{cart})
//     .then(response => {
//         response.data;

//     })
//     .catch(err => {
//       console.log(err);
//     });

// }