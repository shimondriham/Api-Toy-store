class TdToys {
    constructor(_parent, _item, _index, _delToysFunc) {
      this.parent = _parent;
      this.img = _item.img;
      this.name = _item.name;
      this.cat = _item.cat;
      this.info = _item.info;
      this.price = _item.price;
      this.index = _index;
      this._id = _item._id;
      // this.user_id = _item.user_id;
      this.delToysFunc = _delToysFunc;
    }
  
    render() {
      let tr = document.createElement("tr");
      document.querySelector(this.parent).append(tr);
      tr.innerHTML = `
      <td>${this.index + 1}</td>
      <td>${this.name}</td>
      <td>${this.price} USD</td>
      <td>${this.cat}</td>
      <td>${this.info}</td>
      <td>...</td>
      <td>
        <button class="btn btn-danger del_btn">Del</button>
        <button class="btn btn-dark">Edit</button>
      </td>
      `

      let del_btn = tr.querySelector(".del_btn");
      del_btn.addEventListener("click", () => {
        if (confirm(`are you sure you want delete ${this.name} ?`)) {
          // this.delToysFunc(this._id,this.user_id);
          this.delToysFunc(this._id);
        }
      })
    }
  
  }
  
  export default TdToys;