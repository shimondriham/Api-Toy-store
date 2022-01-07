import { doApiGet } from "../services/apiService.js";
import { authUser } from "../services/auth.js";

window.onload = () => {
  init();
}

const init = async() => {
  authUser();
  let url = "https://toys1244.herokuapp.com/users/userInfo";
  let data = await doApiGet(url);
  console.log(data);
  document.querySelector("#id_name").innerHTML = data.name;
  document.querySelector("#id_email").innerHTML = data.email;
  document.querySelector("#id_date").innerHTML = data.date_created;
  document.querySelector("#logout_btn").addEventListener("click", logout)
}

const logout = () => {
  localStorage.removeItem("tok");
  window.location.href = "login.html"
}