const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/User');
const Task = require('../../models/Task');
const Bid = require('../../models/Bid');

router.get('/', (req, res) => {
  console.log('hi');
  Task.find()
  .then(tasks => {
    res.json({message: "Whole tasks are reloaded successfully",data:{data:tasks}});
  })
  .catch(err => res.status(400).json(err));
})

router.get('/:userid',  (req, res) => {
  console.log(req.params.userid);
  let errors = {}
  Task.find()
  .then(tasks => {
    const user_tasks = tasks.filter(item => item.workerId == req.params.userid);
    res.json({data:user_tasks});
  })
})

router.post('/propose/:userid', (req, res) => {
  console.log("proposed")
  let errors = {}
  User.findById(req.params.userid)
  .then(user => {
    if(user) {
      const newTask = new Task({
        description: req.body.description,
        payment: req.body.payment,
        dueDate: req.body.dueDate,
        field: req.body.field,
        title: req.body.title,
        bidStart: req.body.bidStart,
        bidEnd: req.body.bidEnd,
        limitPrice: req.body.limitPrice,
        workerId: req.params.userid,
        worker: user.user.name,
        attached_file: req.body.filename
      });
      newTask.save().then(task => {res.json({message:'New task creaing is successed', data:task})});
       
    } else {
      errors.nouser = "User not registered.";
      res.status(404).json(errors);
    }
  })
  .catch(err => {
    err.nouser = "User not registered."
    res.status(404).json(err);
  });
})

router.delete('/delete/:projectid',  (req, res) => {
  let errors = {};
  Task.findById(req.params.projectid)
  .then(task => {
      Task.findOneAndRemove({_id: req.params.projectid});
      res.json({message: 'Remove success'});
    }
  )
  .catch(err => {
    err.notfound = "Cannot found.";
    res.status(400).json(err);
  });
  
})

// router.post('/change/:userid/:projectid', passport.authenticate('jwt', {session:false}), (req, res) => {
//   let errors = {};
//   Worker.findOne({userId:req.params.userid})
//   .then(worker => {
//     if(worker) {
//       const changeIndex = worker.projects.map(item => item._id).indexOf(req.params.projectid);
//       const editedproject = worker.projects[changeIndex];
//       editedproject.description = req.body.description;
//       editedproject.attached_file = req.body.attached_file;
//       editedproject.offer_price = req.body.offer_price;
//       editedproject.guarantee_fund = req.body.guarantee_fund;
//       editedproject.due_date = req.body.due_date;
//       editedproject.deadline = req.body.deadline;
//       editedproject.margin = req.body.margin;
//       editedproject.project_type = req.body.project_type;
//       editedproject.project_name = req.body.project_name;
//       // res.json(worker);
//       worker.save().then(worker => res.json(worker));
//     } else {
//       errors.noworker = "No worker found";
//       res.status(404).json(errors);
//     }
//   })
//   .catch(err => {
//     err.nouser = "User not registered.";
//     res.status(404).json(err);
//   })
// })


router.get('/receivedesign/:projectid', (req, res) => {
  let errors = {}
  Task.findById(req.params.projectid)
  .then(task => {
    if(task) {
      task.views +=1
     task.save();
      res.json({message:'getting bids', data:{data:task.bids}});
    } else {
      res.json([])
    }
  })
  .catch(err => res.json([]));
})
router.get('/bidinfo/:bidderid', (req, res) => {
  const errors = {}
  Bid.findById(req.params.bidderid)
  .then(bid => {
    if(bid) {
      res.json({message:'getting bidder information', data:{data:bid}});
    } else {
      errors.notfound = "Project not found."
      res.status(404).json(errors);
    }
  })
  .catch(err => res.status(403).json(err));
})

router.get('/acceptdesign/:projectid/:designid', (req, res) => {
  console.log('23435');
  let errors = {}
  Task.findById(req.params.projectid)
  .then(task => {
    if(task) {
      task.status = 1;
      const index  = task.bids.map(item => item._id).indexOf(req.params.designid);
      task.bids[index].state = true;
      task.success_bid = task.bids[index].bidderId;
      
      Bid.findById(req.params.designid)
      .then(bid => {
        if(bid) {
          bid.status = true;
          bid.save();
          res.status(200).json({message: 'success'});

          // res.json({data:task});
          // task.save().then(task => res.json({data:task}));
        } else {
          errors.notfound = "Bid not found.";
          res.status(404).json(errors);
        }
      })
      .catch(err => res.status(403).json(err));

      Task.findOneAndUpdate(
        {_id: req.params.projectid},
        {$set: task},
        {new: true}
      )
      .then(task => res.json({data:task}));
      
    }
  })
  .catch(err => res.status(403).json(err));
})

router.get('/getinfo/:bidderId', (req, res) => {
  const errors = {}
  User.findById(req.params.bidderId)
  .then(user => {
    if( user ) {
      res.json({data: user})
    } else {
      errors.notfound = "User not found.";
      res.status(404).json(errors)
    }
  })
  .catch(err => res.status(404).json(err));
})

router.get('/history/:userid',  (req, res) => {
  Task.find()
  .then(tasks => {
    const filtered = tasks.filter(item => item.workerId == req.params.userid && item.status == 1);
    const accepted_bids = [];
    filtered.map(item => {
      const index = item.bids.map(t => t.bidderId).indexOf(item.success_bid);
      accepted_bids.push(item.bids[index]);
    });
    res.status(200).json({message: success, data: {data: accepted_bids}});
  })
})

router.get('/history/:userid',  (req, res) => {
  Task.find()
  .then(tasks => {
    const filtered = tasks.filter(item => item.workerId == req.params.userid && item.status == 1);
    const accepted_bids = [];
    filtered.map(item => {
      const index = item.bids.map(t => t.bidderId).indexOf(item.success_bid);
      accepted_bids.push(item.bids[index]);
    });
    res.json(accepted_bids);
  })
})

router.get('/updateview/:projectid',  (req, res) => {
  const errors = {}
  Task.findById(req.params.projectid)
  .then(task => {
    if(task) {
      task.views += 1;
      task.save().then(task => res.json(task));
    } else {
      res.status(403).json({error:"Not allowed"});
    }
  })
  .catch(err => res.status(403).json(err));
})

module.exports = router;