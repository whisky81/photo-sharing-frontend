/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
async function fetchModel(url) {
  const models = null;
  try {
    const response = await fetch(`http://localhost:8081${url}`);
    let ok = response.ok;
    const data = await response.json(); 

    if (!ok) {
      throw new Error(data);
    }

    models = data; 
  } catch (error) {
    models = {
      message: error.message 
    }
  }
  return models;
}

export default fetchModel;
