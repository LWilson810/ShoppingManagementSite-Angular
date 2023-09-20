module.exports = {
  // Secret key for JWT signing and encryption
  secret: 'super secret passphrase',
  
  // Database connection information
  db_url: 'mongodb://localhost:27017/cjbsingi',
  db_options: {
    user: 'chonjibong',
    pass: ''
  },
  db_collection_prefix: 'cjb_',

  // Admin default username and password
  admin: {
    name: 'Hye Song',
    gender: 'male',
    userID: 'admin',
    email: 'hys@hys.com',
    authority: 'president',
    age: 25,
    phone: '191-266-3770',
    password: '10141014',
    field: '',
    shop: '',
  },

  // CORS setting
  allowed_origin: ['http://localhost:5000', 'http://localhost:4200','http://localhost:3000','http://localhost:5001', 'http://localhost:8081'],

  // Setting port for server
  expiresIn: 360000, // 100 hr
  port: 5005,
  test_port: 3001,
  test_db: 'mern-starter-test',
  test_env: 'test',

  // file upload path
  upload: '/upload',
  upload_photo: '/photo',
  upload_attachment: '/attachment',
  upload_public: 'public',

  serverUrl: 'http://localhost:5005',

  // log 
  logpath: '/logs',
  
  //laguage setting
  lang: 'kp',

  //reset password
  reset_password: '123456',
  serviceUrl: process.env.REACT_APP_SERVICE_URL || 'http://localhost:3001',
};
