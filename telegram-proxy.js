const worker = {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = 'api.telegram.org';

    const newRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow',
    });

    return fetch(newRequest);
  },
};

export default worker;