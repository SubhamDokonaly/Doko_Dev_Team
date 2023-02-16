/**Add your frontend common function here */

/**  fetchFunction for fetching Data */
async function fetchData(
  { url, method = "GET", Authorization, Type } = {},
  data
) {
  let fetchObject = {
    method: method,
    headers: {
      Authorization: Authorization,
      Type: Type,
      "Content-Type": "application/json",
    },
  };
  if (method === "POST") {
    fetchObject.headers.body = JSON.stringify(data);
  }
  try {
    let response = await fetch(url, fetchObject);
    let responseData = await response.json();
    if (responseData.status === 1 || responseData.status === true) {
      return { result: true, data: JSON.parse(responseData.response) };
    } else {
      return { result: false, data: responseData.response };
    }
  } catch (error) {
    return { result: false, data: error };
  }
}
