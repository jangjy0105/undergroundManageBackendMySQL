const { Router } = require('express');
const { Managers } = require('../data/managers');
const cookieParser = require('cookie-parser');
const { auth } = require('../functions/auth');

const router = Router();

router.use(cookieParser());

router.post('/signup', (req, res) => {
  const data = req.body;
  console.log(data);
  const saveManager = new Managers(data);
  saveManager.save();
})

router.post('/login', (req, res) => {
  Managers.findOne({ id: req.body.id }, (err, manager) => {
    if(!manager) {
      console.log("잘못된 아이디");
      return res.json({ loginSuccess: false, messege: "잘못된 아이디입니다." })
    }
    
    manager.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) {
        console.log("잘못된 비밀번호");
        return res.json({ loginSuccess: false, messege: "비밀번호가 틀렸습니다." })
      }
      
      manager.generateToken((err, manager) => {
        console.log("로그인 성공!")
        if(err) return res.status(400).send(err);

          res.cookie("x_auth", manager.token)
          .status(200)
          .json({ loginSuccess: true, managerId: manager._id })
      })
    })
    
  })

})


router.post('/auth', (req, res) => {
  let token = req.body;

  Managers.findByToken(token, (err, manager) => {
    if(err) throw err;
    if(!manager) return res.json({ isAuth: false, error: false });

    res.send({ isAuth: true, error: false });
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