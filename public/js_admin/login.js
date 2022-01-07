import { doApiMethod } from "../services/apiService.js";

window.onload = () => {
  declareEvents();
}

const declareEvents = () => {
  let id_form = document.querySelector("#id_form");
  id_form.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = document.querySelector("#id_email").value;
    let pass = document.querySelector("#id_password").value
    if(pass.length < 3 || email.length < 3 || !email.includes("@")){
      alert("check password or email");
      return
    }
    doApiLogin()
  })
}

const doApiLogin = async() => {
  let body = {
    email:document.querySelector("#id_email").value,
    password: document.querySelector("#id_password").value
  }
  let url = "https://toys1244.herokuapp.com/users/login";
  let data = await doApiMethod(url,"POST",body);
  console.log(data);
  if(data.token){
    localStorage.setItem("tok",data.token);
    window.location.href = "adminToys.html"
  }
  else{
    alert("Email or password worng. or come back later!")
  }
} 