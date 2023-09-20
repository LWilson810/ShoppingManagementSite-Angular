const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/User');
const Task = require('../../models/Task');
const Bid = require('../../models/Bid');
const Note = require('../../models/Note');

router.get('/tasks', (req, res) => {
  Task.find()
  .then(tasks => {

    res.json({data:tasks});

  })
  .catch(err => res.status(400).json(err));
})

router.get('/task/:projectId', (req, res) => {
  const errors = {}
  Task.findById(req.params.projectId)
  .then(task => {
    if(task) {
      res.json({data:task});
    } else {
      errors.notfound = "Project not found."
      res.status(404).json(errors);
    }
  })
  .catch(err => res.status(403).json(err));
})



router.get('/workerinfo/:userid', (req, res) => {
	const errors = {}
	User.findById(req.params.userid)
	.then(user=> {
		if(user) {
			res.json({data:user});
		} else {
			errors.notfound = "User not found."
			res.status(403).json(errors);
		}
	})
	.catch(err=> {
		res.status(403).json(err);
	})
})

router.post('/bid', (req, res) => {
  let errors = {}
   
  // User.findById(req.body.bidderId)
  // .then(user => {
  //   if(user) {
  //     Bid.findOne({projectId: req.body.projectId, bidderId: req.body.bidderId})
  //     .then(bid => {
  //       if(bid) {
  //         errors.notallowed = "You have already bidded.";
          
  //         res.status(403).json(errors);
  //       } else {
          
          
  //       }
  //     })
  //     .catch(err => res.status(403).json(err));
  //   } else {
      const newbid = new Bid({
        bidderId: req.body.bidderId,
        projectId: req.body.projectId,
        bidderName: req.body.bidderName,
        description: req.body.description,
        payment: req.body.payment,
        attached_file: req.body.attached_file,
        proposalPrice: req.body.proposalPrice,
      })
      console.log(newbid);
      newbid.save()
      .then(newitem => {
        
        Task.findById(req.body.projectId)
        .then(task => {
          if(task) {
            task.bids.unshift(newitem._doc);
            task.save();
            res.json({message:"successfully bidded", data:newitem })
          } else {
            errors.notfound = "Project not found.";
            res.status(404).json(errors);
          }
        })
        .catch(err => {
          res.status(403).json(err)
        })
        //  res.json({message:"successfully bidded",data:newitem})
      })
  //   }
  // })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ,(err => res.status(403).json(err));
})

router.post('/savebid', (req, res) => {
  let errors = {}
  const data = {
    description: req.body.description,
    payment: req.body.payment,
    attached_file: req.body.attached_file,
    proposalPrice: req.body.proposalPrice,
    bidderId: req.body.bidderId,
  }
  User.findById(req.body.bidderId)
  .then(user => {
    if(user) {
    	data.bidderName = user.user.name;
      if(req.body._id) {
        Note.findById(req.body._id)
        .then(note => {
          if(note) {
            Note.findOneAndUpdate(
              {_id: req.body._id},
              {$set: data},
              {new: true}
            ).then(note => res.json({data:note}));
          } 
        })
      } else {
        const newnote = new Note(data);
        newnote.save().then(note => res.json({data:note}));
      }
    } else {
      errors.notallowed = "User not found.";
      res.status(404).json(errors);
    }
  })
  .catch(err => res.status(403).json(err));
})

router.get('/notes/:bidderId', (req, res) => {
  Note.find()
  .then(notes => {
    const filters = notes.filter(item => item.bidderId == req.params.bidderId);
    res.json(filters);
  })
  .catch(err => res.status(403).json(err));
})

// router.post('/:userid/:projectid/tasks', (req, res) => {
//   let errors = {}
//   Bid.findOne({bidderID: req.params.userid, taskID: req.params.projectid})
//   .then(bid => {
//     if(bid) {
//       const updateBid = {
//         description: req.body.description,
//         payment_option: req.body.payment_option,
//         attached_file: req.body.attached_file,
//       };
//       Bid.findOneAndUpdate(
//         {_id: bid._id},
//         {$set: updateBid},
//         {new: true}
//       ).then(updatedbid => {
//         Task.findById(req.params.projectid)
//         .then(task => {
//           const index = task.bids.map(item => item.bidderID).indexOf(req.params.userid);
//           task.bids.splice(index, 1);
//           task.bids.unshift(updatedbid);
//           task.save();
//         })
//         res.json(updatedbid)
//       });
//     } else {
//       User.findOne({userID:req.params.userid})
//       .then(user => {
//         if(user) {
//           const newBid = new Bid({
//             userObjectId: user._id,
//             bidderID: user.userID,
//             taskID: req.params.projectid,
//             description: req.body.description,
//             payment_option: req.body.payment_option,
//             attached_file: req.body.attached_file,
//           })
//           newBid.save().then(bid => {
//             Task.findById(req.params.projectid)
//             .then(task => {
//               if(task) {
//                 task.bids.unshift(bid);
//                 task.save();
//               } else {
//                 errors.notfound = 'Project not found.';
//                 res.status(404).json(errors);
//               }
//             })
//             res.json(bid);
//           });
//         } else {
//           errors.notregistered = 'Not signed up.';
//           res.status(404).json(errors);
//         }
//       })
//       .catch(err => {
//         err.notregistered = "Not signed up.";
//         res.status(404).json(errors);
//       })
//     }
//   })
  
// })

// router.get('/notes/:userid', (req, res) => {
//   Designer.findOne({userId: req.params.userid})
//   .then(designer => {
//     if(designer) {
//       res.json(designer.mynotes); 
//     } else {
//       res.json([]);
//     }
//   })
//   .catch(err => {
//     err.nouser = "User not registered.";
//     res.status(404).json(err);
//   })
// })

// router.get('/designerhis/:userid', (req, res) => {
//   let errors = {}
//   Designer.findOne({userId: req.params.userid})
//   .then(designer => {
//     if(designer) {
//       res.json(designer.mybids);
//     } else {
//       // errors.nodesigner = "Designer not found.";
//       res.json([]);
//     }
//   })
//   .catch(err => {
//     err.nouser = "User not registered.";
//     res.status(404).json(err);
//   })
// })

// router.delete('/tasks/:userid/:projectid', (req, res) => {
//   let errors = {}
//   Designer.findOne({userId : req.user.id})
//   .then(designer => {
//     if(designer) {
//       const removeIndex = designer.mybids.map(item => item.projectId).indexOf(req.params.projectid);
//       designer.mybids.splice(removeIndex, 1);
//       Worker.findOne({userId : req.params.userid})
//       .then(worker => {
//         if(worker) {
//           const index = worker.projects.map(item => item._id).indexOf(req.params.projectid);
//           const removeIndex = worker.projects[index].comments.map(item => item.designerId).indexOf(req.user.id);
//           worker.projects[index].comments.splice(removeIndex, 1);
//           worker.save(); 
//         }
//       })
//       designer.save().then(designer => res.json(designer));
//     } else {
//       errors.nodesigner = "Designer not found.";
//       res.status(404).json(errors);
//     }
//   })
//   .catch(err => {
//     err.nouser = "User not registered.";
//     res.status(404).json(err);
//   })
// })

module.exports = router;