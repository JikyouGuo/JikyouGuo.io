/**
 * @param {String} method
 * @param {String} url
 * @param {Function} callback
 * @param {*} data
 * @param {Boolean} isAsync
 */
function ajax(method, url, callback, data, isAsync) {
  let xhr = null;
  if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
  else xhr = new ActiveXObject("Microsoft.XMLHttp");
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) callback(xhr.responseText);
      else console.log("error:", xhr.status);
    }
  };
  method = method.toUpperCase();
  if (method === "GET") {
    xhr.open(method, url + "?" + data, isAsync);
    xhr.send();
  } else if (method === "POST") {
    xhr.open(method, url, isAsync);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlcoded");
    xhr.send(data);
  }
}
