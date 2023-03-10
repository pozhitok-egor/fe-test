import ky from 'ky';

const fetchApi = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  hooks: {
    afterResponse: [
      async (_input, _options, response) => {
        if (response.headers.get('content-type') === 'application/json') {
          const body = await response.json();
          if (response.status !== 200) {
            throw new Error(body.data.message || 'Error while fetching data');
          }
        }
      },
    ],
  },
  retry: 0,
});

export default fetchApi;
