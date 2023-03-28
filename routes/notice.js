const { Router } = require('express');
const { Notices } = require('../data/notices');
const { getList } = require('../functions/getList');
const { getTotalLength } = require('../functions/getTotalLength');

const router = Router();

router.post('/getLength', (req, res) => {
  getTotalLength(Notices, req.body, res, [], []);
})

router.post('/upload', (req, res) => {
  const data = req.body;
  data.date = new Date()
  console.log(data);
  const saveNotice = new Notices(data);
  saveNotice.save();
})

router.post('/getNoticeList', async(req, res) => {

  const data = await getList(Notices, req.body, [], [], 'noticeName'); 
  
  res.send(data);
})

module.exports = router