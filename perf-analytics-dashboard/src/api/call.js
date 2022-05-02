let call = {};

const api = process.env.REACT_APP_API || "http://localhost:3000";

call.api = (parameters = {}) => {
  let requestParams = prepareParams(parameters);
  const requestOptions = prepareOptions(requestParams);

  return fetch(requestParams.url, requestOptions)
    .then((response) => {
      if (response.status !== 204) {
        return response.json().then((json) => ({ json, response }));
      } else {
        return { json: [], response };
      }
    })
    .then(({ json = [], response }) => {
      if (!response.ok) {
        console.log("response not ok" + JSON.stringify(response));
        return Promise.reject(json);
      }

      return json;
    });
};

function prepareParams(parameters) {
  let requestParams = {
    method: "POST",
    body: undefined,
    url: "",
    endpoint: null,
  };

  requestParams = { ...requestParams, ...parameters };
  requestParams.url = api + requestParams.endpoint;

  return requestParams;
}

function prepareOptions(requestParams) {
  let requestOptions = {
    method: requestParams.method,
    headers: {
      "Content-Type": "application/json",
      ...requestParams.headers,
    },
    credentials: "include",
    body: JSON.stringify(requestParams.body),
  };

  return requestOptions;
}

export default call;
