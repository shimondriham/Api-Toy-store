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
      Name: document.querySelector("#id_name").value,
      email: document.querySelector("#id_email").value,
      password: document.querySelector("#id_password").value,
    }
    let url = "https://toys1234.herokuapp.com/users";
    doApiWithMethod(url, bodyObj, "POST");
  })
}

const doApiWithMethod = async (_url, _bodyPayload, _method) => {
  try {
    let resp = await fetch(_url, {
      method: _method,
      body: JSON.stringify(_bodyPayload),
    })
    let data = await resp.json();
    if (data._id) {
      alert("user added succefuly!")
      console.log("qq")
      window.location.href = "login.html";
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