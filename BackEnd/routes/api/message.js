const express = require('express');
const { nextTick } = require('process');
const router = express.Router();
const Message = require('../../models/Message');



router.post('/add', (req, res) => {
  console.log("hello here",req.body);
  const data = req.body
  Message
  .find()
  .then(()=>{
    console.log("ghgo")
    const message = new Message({
      sender: data.sender,
      receiver: data.receiver,
      message: data.message,
      date: data.date,
      state: data.state
    })
    console.log("message", message);
    message.save((data,error)=>{
      res.status(200).json({
        message:'Send successfully',data:data
      })
    })
  })
})

router.get('/getAll', (req, res) => {
  Message
    .find()
    .exec(function(err, docs){
      console.log(docs);
        if(err) returnres.status(403).send({ message: 'error'});
        return res.status(200).json({ data: docs});
    });
})

// exports.update = function(req,res, next){
//     Article.findOneAndUpdate(
//         { title: req.body.title},
//         { $set : { avatar:  avatar} },
//         (err, doc)=>{
//          User.findOne({ _id: req.body.id }, (err, existingUser) => {
//            const userInfo = setUserInfo(existingUser, req);
   

router.post('/update', (req, res) => {
  const sendData = [];
  const updateData = req.body;
  updateData.map(data=>{
    Message
    .findOneAndUpdate(
      {sender:data.sender,receiver:data.receiver,message:data.message},
      {$set:{state:data.state}},
      (err,doc)=>{
        sendData.push(doc);
      }
      )
  })
  return res.status(200).json({data:sendData});
})

router.post('/del', (req, res) => {
  Message
    .findOne({message:req.body.message,sender:req.body.sender, date: req.body.date})
    .remove((err, result) => {
      if (err) return next(err);
      Message
      .find()
      .exec(function(err, docs){
        console.log(docs);
          if(err) returnres.status(403).send({ message: 'error'});
          return res.status(200).json({message:'delete successfully' ,data: docs});
      });
    });
})

module.exports = router;