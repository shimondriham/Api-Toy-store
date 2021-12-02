const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
 

  await mongoose.connect('mongodb+srv://shimondriham:shimon523@cluster0.frzne.mongodb.net/nov21');
  console.log("mongo connected!!!");
}

