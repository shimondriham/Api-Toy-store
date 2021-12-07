window.onload = () => {   
    init();
}

const init = () => {
    declareEvents();
}

const declareEvents = () => {
  let id_form = document.querySelector("#id_form");
  id_form.addEventListener("submit", (e) => {  
    e.preventDefault();
    let bodyObj = {
      name: document.querySelector("#id_name").value,
      price: document.querySelector("#id_price").value,
      cat: document.querySelector("#id_usually").value,
      info: document.querySelector("#id_info").value,
      img: document.querySelector("#id_imge").value
    }
    let url = "https://toys1234.herokuapp.com/toys";
    doApiWithMethod(url, bodyObj, "POST");
  })
}

const doApiWithMethod = async (_url, _bodyPayload, _method) => {
  try {
    let resp = await fetch(_url, {
      method: _method,
      body: JSON.stringify(_bodyPayload),
      headers: { 
        "x-api-key":localStorage["tok"],
        'content-type': "application/json"
     } })
    let data = await resp.json();
    if (data._id) {
      alert("Toy added succefuly!")
      window.location.href = "adminToys.html";
    }
    else{
      console.log(data);
      alert(data[0].message)
    }
    console.log(data);
  }
  catch(err){
    console.log(err);
    alert("There problem, come back later")
  }
}