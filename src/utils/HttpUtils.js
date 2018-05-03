
// const getOpts = {
//   method: 'GET',
// };
//
// const postOpts = {
//   method: 'POST',
//   headers: {
// 	'Accept': 'application/json',
// 	'Content-Type': 'application/json',
//   }
// };
//
// export default function fetchNetRepository(url, parameters = {}, method = 'POST') {
//   let params = {
// 	...parameters,
//   };
//   let opts = method === 'POST' ? { ...postOpts, body: JSON.stringify(params)} : { ...getOpts, body: JSON.stringify(params)};
//   return new Promise((resolve, reject) => {
// 	fetch(url,opts)
// 	  .then((response) => response.json())
// 	  .catch((error) => {
// 		reject(error);
// 	  })
// 	  .then((responseData) => {
// 		if (responseData) {
// 		  resolve(responseData);
// 		} else {
// 		  reject(new Error('responseData is null'));
// 		}
// 	  })
// 	  .done();
//   });
// }

export default class HttpUtils {
  static get(url) {
	return new Promise((resolve, reject) => {
	  fetch(url)
		.then((response) => response.json())
		.then((result) => {
		  resolve(result);
		})
		.catch((error) => {
		  reject(error);
		});
	});
  }

  static post(url, data) {
	let params = {
	  ...data,
	};
	return new Promise(() => {
	  fetch(url, {
		method: 'POST',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(params)
	  })
		.then((response) => response.json())
		.then((result) => {
		  resolve(result);
		})
		.catch((error) => {
		  reject(error);
		});
	})
  }
}