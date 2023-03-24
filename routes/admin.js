const { Router } = require('express');
const { Admins } = require('../data/admins');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const router = Router();

router.use(cookieParser());

router.post('/signup', (req, res) => {
  const data = req.body;
  console.log(data);
  const saveAdmin = new Admins(data);
  saveAdmin.save();
})

router.post('/login', (req, res) => {
  Admins.findOne({ id: req.body.id }, (err, admin) => {
    if(!admin) {
      console.log("잘못된 아이디");
      return res.json({ loginSuccess: false, messege: "등록되지 않은 아이디입니다." })
    }
    
    admin.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) {
        console.log("잘못된 비밀번호");
        return res.json({ loginSuccess: false, messege: "잘못된 비밀번호입니다." })
      }
      
      admin.generateToken((err, admin) => {
        console.log("로그인 성공!")
        if(err) return res.status(400).send(err);

          res.cookie("x_auth", admin.token)
          .status(200)
          .json({ loginSuccess: true, name: admin.name })
      })
    })
    
  })

})


router.post('/auth', (req, res) => {
  let token = req.body.token;

  Admins.findByToken(token, (err, admin) => {
    if(err) throw err;
    if(!admin) return res.json({ isAuth: false });

    res.send({ isAuth: true, admin: admin });
  })
})

// router.post('/getLength', (req, res) => {
//   getListLength(Notices, req.body.queryData, res, [], []);
// })

// router.post('/upload', (req, res) => {
//   const data = req.body;
//   data.date = new Date()
//   console.log(data);
//   const saveNotice = new Notices(data);
//   saveNotice.save();
// })

// router.post('/getNoticeList', async(req, res) => {

//   const data = await getList(Notices, req.body, [], [], 'noticeName'); 
  
//   res.send(data);
// })

module.exports = router