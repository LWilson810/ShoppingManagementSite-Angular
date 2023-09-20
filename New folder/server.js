const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
// const cors = require('cors');
const User = require('./models/User');
const LoggedUser = require('./models/LoggedUser');
const users = require('./routes/api/users');
const message = require('./routes/api/message');
const workers = require('./routes/api/worker');
const designers = require('./routes/api/designer');
const commodity = require('./routes/api/commodity');
const passport = require('passport');
const keys = require('./config/keys');
const config = require('./config/main');
const fs = require('fs');
const mime = require('mime');
const multer = require('multer');
// const logger = require('morgan');
const app = express();
const axios = require('axios');
const bcrypt = require('bcryptjs');

// app.use(cors());
// app.options('*', cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })); // Parses urlencoded bodies
app.use(bodyParser.json({limit:'50mb'})); // Send JSON responses
// app.use(fileUpload());
// app.use(logger('dev')); // Log requests to API using morgan
app.use(express.static('public'));


var chatServer = require('http').Server(app);
var io = require('socket.io')(chatServer);
var loginUsers = [];
console.log("chatServer created at 8080");

io.on('connection', function(socket){ 
  console.log("connected");
  var addedUser = false;

	socket.on('add user', function(userID) {
    LoggedUser.findOne({userID: userID})
    .then(user => {
      if(!user) {
        const newUser = new LoggedUser({
          userID: userID
        });
        newUser.save();
      }
    })
    var ns = io.of("/");
    var flag = false
    if (ns) {
        Object.keys(ns.connected).forEach(function (id) {
          if(ns.connected[id].userID == userID){
            flag = true;
          }    
        });
    }
    if(!flag) {
      socket.userID = userID;
    }
    // var flag = true;
    // console.log('add user', userID);
		// loginUsers.map(user => {
		// 	if(user == userID){
    //     flag = false;
		// 		return;
		// 	}
		// })

		// if(flag){
    //   socket.userID = userID;
    //   if(userID != null)
		// 	  loginUsers.push(userID);
		// }
  });

  socket.on('userout', (data) => {
    console.log(data.userID);
  })

  socket.on('disconnect', () => {
    console.log("disconnect", socket.userID);
    if(socket.userID != null) {
      // loginUsers = loginUsers.filter(mem => mem !== socket.userID);
      LoggedUser.findOne({userID: socket.userID})
      .then(user => {
        if(user) {
          LoggedUser.findOneAndRemove({_id: user._id})
        }
      })
    }
    socket = null;
  });
  
    socket.on('send message', function(data) {
      console.log("hello",data);
        // var ns = io.of("/");
        //   if (ns) {
        //       Object.keys(ns.connected).forEach(function (id) {
        //     if(ns.connected[id].userID == data.receiver)
        //               console.log("HI", data)
        //               ns.connected[id].emit('message',data);
        //       });
        //   }
        socket.broadcast.emit('message',data);
        });
});

chatServer.listen(8080);


app.use((req, res, next) => {
	
  let origin = req.headers.origin;
  // console.log(req.headers);
  if(config.allowed_origin.indexOf(origin) >= 0) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  // res.header('Bidding-Site-Id', );
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, bidding-site-id, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, content-type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

const db = 'mongodb://localhost:27017/db';

mongoose.connect(db)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

User.findOne({userID:'admin'})
.then(user => {
  if(!user) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(config.admin.password, salt, (err, hash) => {
        if(err) throw err;
        const newUser = new User({
          ...config.admin,
          password: hash
        });
        
        newUser.save();
      })
    })
  }
})

////////////////
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  const fileDest = path.join(__dirname, `/upload_file/${req.params.userid}`);
   // console.log('hi nice t o mee ty ou')
      if(!fs.existsSync(fileDest)) {
          fs.mkdir(fileDest, { recursive:true }, function(err) {
              if(err) {
                  console.log(err);
                  cb(null, err);
              } else {
                  cb(null, fileDest)
              }
          })
      } else {
          cb(null, fileDest)
      }
  },
  filename: function (req, file, cb) {
    console.log('filename', req.params.filename)
    var arr = file.originalname.split('.');
		var ext = arr.pop();
        var name = req.params.filename ;
    //     for(var i = 0; i< arr.length; i ++) {
		// 	name += arr[i] + '.'
			
		// }
        if(ext === undefined) {
            cb(null, name + '_' + Date.now())
        } else {
            cb(null, name )
        }
  }
})
//////////////

var storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
  const fileDest = path.join(__dirname, `/upload_file/${req.params.userid}/${req.params.foldername}`);
    console.log('nice to meet you' ,file)
      if(!fs.existsSync(fileDest)) {
          fs.mkdir(fileDest, { recursive:true }, function(err) {
              if(err) {
                  console.log(err);
                  cb(null, err);
              } else {
                  cb(null, fileDest)
              }
          })
      } else {
          cb(null, fileDest)
      }
  },
  filename: function (req, file, cb) {
    // console.log('filename', file)
    var arr = file.originalname.split('.');
		var ext = arr.pop();
        var name =file.originalname ;
    //     for(var i = 0; i< arr.length; i ++) {
		// 	name += arr[i] + '.'
			
		// }
        if(ext === undefined) {
            cb(null, name + '_' + Date.now())
        } else {
            cb(null, name )
        }
  }
})
// var upload = multer({ storage: storage }).array('file')

app.get('/test', (req, res) => {
  var data = new Array();
  // res.json('data');
  axios.get('http://localhost:5000/main/quesandans/all')
  .then(response => {
    console.log(response.data);
    data = response.data;
    res.json(data);
  })
  
})

app.get('/api/download/:userid/:filename', (req, res) => {
  var folderpath = __dirname + `/upload_file/${req.params.userid}/`;
  var path = folderpath + req.params.filename;
  fs.exists(path, function(exists) {
    if(exists) {
      res.writeHead(200, {'content-type': 'application/zip'})
      fs.createReadStream(path).pipe(res); 
    } else {
      res.status(400).json({err:'File not exists.'});
    }
  })
})

app.post('/api/upload/:userid/:filename', (req, res) => {
  var upload = multer({storage: storage}).single('file');
  // var file = JSON.parse(JSON.stringify(req.files))
  upload(req, res, (err) => {


    if(err) {

      return res.json("Error uploading file.");
    }
    // res.status(200).json({type:4, message: "Fileuploading  is successed"});

  //  res.json({data:__dirname});
    // res.end(__dirname);
  });
    
})
app.post('/api/uploadfolder/:userid/:foldername', (req, res) => {
  var upload = multer({storage: storage1}).array('files');

  // var file = JSON.parse(JSON.stringify(req.files))
  upload(req, res, (err) => {
    console.log('abce', req.files)

    if(err) {

      return res.end("Error uploading file.");
    }
    res.status(200).json({message: "Fileuploading  is successed"});
  });
    
})
var avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderpath = '\\Team Project(Angular)\\src\\assets';
    const fileDest = path.join(folderpath, `/uploadAvatar/${req.params.userid}`);
  // const fileDest = path.join(__dirname, `/upload_file/${req.params.userid}`);
      if(!fs.existsSync(fileDest)) {
          fs.mkdir(fileDest, { recursive:true }, function(err) {
              if(err) {
                  console.log(err);
                  cb(null, err);
              } else {
                  cb(null, fileDest)
              }
          })
      } else {
          cb(null, fileDest)
      }
  },
  filename: function (req, file, cb) {
    cb(null, req.params.filename)
  }
})

app.post('/api/avatarupload/:userid/:filename', (req, res) => {
  var upload = multer({storage: avatarStorage}).single('file');
  upload(req, res, (err) => {
    if(err) {
      return res.end("Error uploading avatar.");
    }
    res.end(__dirname);
  })
})


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  // let folderpath = '\\web\\Project\\ShoppingSite\\src\\assets';
  let folderpath = __dirname;
  const fileDest = path.join(folderpath, `/public/${req.params.commodityname}`);
   // console.log('hi nice t o mee ty ou')
      if(!fs.existsSync(fileDest)) {
          fs.mkdir(fileDest, { recursive:true }, function(err) {
              if(err) {
                  console.log(err);
                  cb(null, err);
              } else {
                  cb(null, fileDest)
              }
          })
      } else {
          cb(null, fileDest)
      }
  },
  filename: function (req, file, cb) {
      console.log('filename', req.params.filename)
      var arr = file.originalname.split('.');
      var ext = arr.pop();
      var name = file.originalname ;
  //     for(var i = 0; i< arr.length; i ++) {
      // 	name += arr[i] + '.'
          
      // }
      if(ext === undefined) {
          cb(null, name + '_' + Date.now())
      } else {
          cb(null, name )
      }
  }
})

app.post('/api/commodity/add/figure/:commodityname', (req, res) => {
  var upload = multer({storage: storage}).array('files');
  upload(req, res, (err) => {
      if(err) {
          return res.json("Error uploading file.");
      } 
      res.status(200).json({message:'Uploading Figures successfully.'});
  });
    
})


app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({limit:'50mb'}));
app.use(passport.initialize());
//app.use(cors());
//app.options('*', cors());
require('./config/passport')(passport); 
app.use('/api/users', users);
app.use('/api/message', message);
app.use('/api/worker', workers);
app.use('/api/designer', designers);
app.use('/api/commodity', commodity);

// app.post('/api/text/add', (req, res) => {
//   console.log(req.body);
// })

const port = process.env.PORT || 5005;

app.listen(port, () => console.log(`Server running on port ${port}`));

// const mainServer=https.createServer({
//   key:fs.readFileSync(path.resolve(__dirname,"../crt/key.pem")),
//   crt:fs.readFileSync(path.resolve(__dirname,"../crt/cert.pem"))
// },app);

// mainServer.listen(port, () => console.log(`Server running on port ${port}`));
