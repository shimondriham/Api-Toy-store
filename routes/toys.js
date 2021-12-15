const express = require("express");
const { ToyModel, validateToys } = require("../models/toyModel")
const {auth} = require("../middlewares/auth");
const router = express.Router();


router.get("/", async (req, res) => {
      let perPage = req.query.perPage || 10;
      let page = (req.query.page >= 1) ? req.query.page - 1: 0; 
      let sort = req.query.sort || "_id";
      let reverse = (req.query.r == "yes") ? -1 : 1 
      try {
        let searchQ = req.query.search;
     let query 
     if(!searchQ){
       query = {}
     }
     else{
       let searcRegX = new RegExp(searchQ, "i")
       query =   {$or:[{name:searcRegX},{info:searcRegX}]}
     }
        let data = await ToyModel.find(query)
        .limit(Number(perPage))
        .skip(page * perPage)
        .sort({[sort]:reverse})
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ err: "page must be between 1-end, or maby DB down" })
    }
})



router.get("/myData",auth , async(req,res) => {
  try{
    let data = await ToyModel.find({user_id:req.userTokenData._id})
    res.json(data)
  }
  catch(err){
    console.log(err)
    res.status(500).json({err:" DB down , come back later"})
  }
})


router.get("/cat/:catname", async (req, res) => {
    let catname = req.params.catname;
    try {
        let catnameRegX = new RegExp(catname, "i")
        let data = await ToyModel.find({ cat: catnameRegX })
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ err: "page must be between 1-end, or maby DB down" })
    }
})


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
  
  
router.post("/", auth , async(req,res) => {
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