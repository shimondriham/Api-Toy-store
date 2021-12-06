import { doApiGet } from "./apiService.js";

// פונקציה שבודקת אם למשתמש יש טוקן
// נפעיל את הפונקציה בהתחלה של כל עמוד שבו אנחנו
// יודעים שהוא חייב להיות מחובר
export const authUser = async() => {
  let url = "https://toys1234.herokuapp.com/users/checkToken";
  let data = await doApiGet(url) 
  if(data.status != "ok"){
    alert("You need login again to be here");
    window.location.href = "login.html";
  }
}