import Toys from "./foodClass.js"

window.onload = () => {
  init();
}

const init = () => {
  doApi();
}

async function doApi() {
  let url = "https://toys1234.herokuapp.com/foods/?perPage=100";
  let resp = await fetch(url);
  let data = await resp.json();
  console.log(data);
  createAllToys(data);
}

const createAllToys = (_arJson) => {
  _arJson.forEach(item => {
    let Toys = new Food("#id_row",item);
    Toys.render();
  })
}