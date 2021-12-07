class Toys{
    constructor(_parent,_item){
      this.parent = _parent;
      this.img = _item.img;
      this.name = _item.name;
      this.cat = _item.cat;
      this.info = _item.info;
      this.price = _item.price;
    }
  
    render(){
      let div = document.createElement("div");
      div.className = "col-lg-4 border p-2";
      document.querySelector(this.parent).append(div);
  
      div.innerHTML = `
      <img src="${this.img}"  class="float-start w-50 me-2" alt='${this.name}'>
      <h2>${this.name}</h2>
      <div>Price: ${this.price} USD</div> 
      <div>usually: ${this.cat}</div>
      <div>information: ${this.info}</div>
      `
    }
  }
  
  export default Toys;