import { doApiGet } from "./apiService.js";

export const authUser = async() => {
  let url = "https://toys1244.herokuapp.com/users/checkToken";
  let data = await doApiGet(url) 
  if(data.status != "ok"){
    alert("You need login again to be here");
    window.location.href = "login.html";
  }
}