import TdToys from "./tdToys.js";
import { doApiGet } from "../services/apiService.js";
import { authUser } from "../services/auth.js";

window.onload = () => {
  init();
}

const init = () => {
  authUser();
  doApi();
}

const doApi = async () => {

  let url = "https://toys1244.herokuapp.com/toys/myData";
  let data = await doApiGet(url);
  console.log(data);
  createTable(data);
}

const createTable = (_arJson) => {
  document.querySelector("#id_tbody").innerHTML = ""
  _arJson.forEach((item, i) => {
    let tr = new TdToys("#id_tbody", item, i, delToys);
    tr.render()
  })
}


const delToys = async (_id) => {
  try {
    let urlDel = "https://toys1244.herokuapp.com/toys/" + _id;
    let resp = await fetch(urlDel, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "x-api-key": localStorage["tok"],
        'content-type': "application/json"
      }
    })
    let data = await resp.json();
    if (data.deletedCount == 1) {
      alert("deleted success");
      doApi();
    }
  }
  catch (err) {
    console.log(err)
    alert("THere problem, come back later!");
  }
}
