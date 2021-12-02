const express = require("express");
const { ToyModel, validateToys } = require("../models/toyModel")
const {auth} = require("../middlewares/auth");
const router = express.Router();

// https://toys1234.herokuapp.com/toys
// http://localhost:3000/toys/?s=doll
// http://localhost:3000/toys/?page=1
router.get("/", async (req, res) => {
    try {
        let page = req.query.page || 1;
        let searchQ = req.query.s;
        let query
        if (!searchQ) {
            query = {}
        }
        else {
            let searchRegX = new RegExp(searchQ, "i")
            query = ({ $or: [{ name: searchRegX }, { info: searchRegX }] });
        }
        let data = await ToyModel.find(query)
            .limit(10)
            .skip(((page - 1) * 10))
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ err: "page must be between 1-end, or maby DB down" })
    }
})

// https://toys1234.herokuapp.com/toys/cat/for%20Girls
// http://localhost:3000/toys/cat/Girls
router.get("/cat/:catname", async (req, res) => {
    let catname = req.params.catname;
    try {
        let catnameRegX = new RegExp(catname, "i")
        let data = await ToyModel.find({ cat: catnameRegX })
        // let data = await ToyModel.find({ cat: catname })
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ err: "page must be between 1-end, or maby DB down" })
    }
})

// http://localhost:3000/toys/price/?max=50&min=20&page=1
router.get("/price", async(req,res) => {
    try{
      let page = req.query.page || 1;
      let max = req.query.max || 9999 ;
       let min = req.query.min || 0;
      let data = await ToyModel.find({$and:[{price:{$lte:max}},{price:{$gte:min}}]})
      .limit(10)
      .skip(((page-1)*10))
      res.json(data)
    }
    catch(err){
      console.log(err)
      res.status(500).json({err:"page must be between 1-end, or maby DB down"})
    }
  })
  
  

//   http://localhost:3000/toys
router.post("/", auth , async(req,res) => {
    // בדיקה שהריקוייסט באדי תקין /ולדזציה
    let validBody = validateToys(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try{
      let toy = new ToyModel(req.body);
      toy.user_id = req.userTokenData._id;
      await toy.save();
      res.status(201).json(toy);
    }
    catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  })

//   http://localhost:3000/foods/idEdit
  router.put("/:idEdit", auth,async(req,res) => {
    let validBody = validateToys(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try{
      let idEdit = req.params.idEdit
      let data = await ToyModel.updateOne({_id:idEdit,user_id:req.userTokenData._id},req.body)
      res.json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  });

  //   http://localhost:3000/foods/idDel
  router.delete("/:idDel", auth , async(req,res) => {
    let idDel = req.params.idDel;
    try{
      let data = await ToyModel.deleteOne({_id:idDel,user_id:req.userTokenData._id});
      res.json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  })



module.exports = router;