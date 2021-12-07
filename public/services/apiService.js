export const doApiGet = async(_url) => {
  let resp = await fetch(_url,{
    method:"GET",
    headers: { 
      "x-api-key":localStorage["tok"],
      'content-type': "application/json"
   } })
  let data = await resp.json();
  return data;
}


export const doApiMethod = async(_url, _method, _body) => {
  let resp = await fetch(_url,{
    method:_method,
    body:JSON.stringify(_body),
    headers: { 
      "x-api-key":localStorage["tok"],
      'content-type': "application/json"
   } })
  let data = await resp.json();
  return data;
}