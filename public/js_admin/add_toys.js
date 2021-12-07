window.onload = () => {   
    init();
}

const init = () => {
    // authUser();
    declareEvents();

}

const declareEvents = () => {
  let id_form = document.querySelector("#id_form");
  id_form.addEventListener("submit", (e) => {
    // אמנע מהטופס לשגר את עצמו בברירת מחדל
    e.preventDefault();

    // במציאות בדרך כלל גם נעשה ולדזציה בצד לקוח
    // לאינפוטים מבחינת כמות תווים, סוג תווים
    // וכו....



    // console.log("hello")
    // אוסף את כל השדות של הטופס לתוך אובייקט
    let bodyObj = {
      name: document.querySelector("#id_name").value,
      price: document.querySelector("#id_price").value,
      cat: document.querySelector("#id_usually").value,
      info: document.querySelector("#id_info").value,
      img: document.querySelector("#id_imge").value
    }
    // console.log(bodyObj);
    let url = "https://toys1234.herokuapp.com/toys";
    doApiWithMethod(url, bodyObj, "POST");
  })
}

const doApiWithMethod = async (_url, _bodyPayload, _method) => {
  // בקשת פטץ במיטוד שהוא לא גט
  // עם באדי
  try {
    let resp = await fetch(_url, {
      method: _method,
      body: JSON.stringify(_bodyPayload),
      headers: { 
        "x-api-key":localStorage["tok"],
        'content-type': "application/json"
     } })
    let data = await resp.json();
    // אם יש הצלחה נקבל מאפיין איי די
    if (data._id) {
      alert("Food added succefuly!")
      // מחזיר לעמוד בית
      window.location.href = "adminToys.html";
    }
    else{
      // סביר להניח שיש שגיאה
      console.log(data);
      alert(data[0].message)
      // במציאות ייתכן שנבדוק מה השגיאה ונציג
      // שגיאה מנוסחת משלנו ללקוח שמשתמש במערכת
    }
    console.log(data);
  }
  catch(err){
    // במקרה שלנו יגיע לקצ' הנל רק אם השרת עצמו נפל
    console.log(err);
    alert("There problem, come back later")
  }
}