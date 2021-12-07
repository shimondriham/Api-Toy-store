import Toys from "./toysClass"

window.onload = () => {
  init();
}

const init = () => {
  doApi();
}

async function doApi() {
  let url = "https://toys1234.herokuapp.com/toys/?perPage=100";
  let resp = await fetch(url);
  let data = await resp.json();
  console.log(data);
  createAllToys(data);
}

const createAllToys = (_arJson) => {
  _arJson.forEach(item => {
    let toys = new Toys("#id_row",item);
    toys.render();
  })
}