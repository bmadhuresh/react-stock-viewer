const axios = require('axios').default;

export async function fetchJSONData (currDate) {
	try {
		const response = await axios.get('http://localhost:7777/', {
			params: {
				date: currDate 
			},
		});
		return response;
	} catch (error) {
		console.error(error);
	}
};