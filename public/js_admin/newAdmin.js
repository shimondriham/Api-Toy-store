import { doApiMethod } from "../services/apiService.js";
window.onload = () => {   
  declareEvents();
}

const declareEvents = () => {
  let id_form = document.querySelector("#id_form");

  id_form.addEventListener("submit", (e) => {  
    e.preventDefault();
    doApi();
  })
}
const doApi = async() => {
 let url = "https://toys1244.herokuapp.com/users";
    let body = {
      name: document.querySelector("#id_name").value,
      email: document.querySelector("#id_email").value,
      password: document.querySelector("#id_password").value,
    }
    try{
        let data = await doApiMethod(url, "POST" ,body);
        if(data._id){
          alert("You sign up success , now log in")
          window.location.href = "login.html";
        }
        else if(data.msg){
          alert("User already in system, try login")
        }
        else{
          alert("there problem ,come back later")
        }
      }
      catch(err){
        console.log(err);
        alert("There big problem ! come back later")
      }
    
    }







//     doApiWithMethod(url, bodyObj, "POST");
// }

// const doApiWithMethod = async (_url, _body, _method) => {
//   try {
//     let resp = await fetch(_url, {
//       method: _method,
//       body: JSON.stringify(_bodyPayload),
//     })
//     let data = await resp.json();
//     if (data._id) {
//      
//       console.log("qq")
//       window.location.href = "login.html";
//     }
//     else{
//       console.log(data);
//       alert(data[0].message)
//     }
//     console.log(data);
//   }
//   catch(err){
//     console.log(err);
//     alert("There problem, come back later")
//   }
// }
