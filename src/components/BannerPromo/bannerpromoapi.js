import { URL } from "../../static/Const/vars";


  export function sendBannerPromo(callback) {
    fetch(URL + '/bannerpromo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
      })
    })
    .then((response) => response.json())
    .then((data) => {
          console.log('bannerpromo', data)
          return callback(data)
      });
  }

