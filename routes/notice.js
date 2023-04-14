const { Router } = require('express');
const { Notices } = require('../data/notices');
const { getList } = require('../functions/getList');
const { getTotalLength } = require('../functions/getTotalLength');
const { upload } = require('../functions/upload');

const router = Router();

router.post('/getLength', (req, res) => {
  const dateFields = ['date'];
  getTotalLength(Notices, req.body, res, [], dateFields);
})

router.post('/upload', (req, res) => {
  const data = req.body;
  upload(Notices, data);
})

router.post('/getList', async(req, res) => {

  const dateFields = ['date'];
  const data = await getList(Notices, req.body, [], dateFields, 'noticeName'); 
  
  res.send(data);
})

module.exports = router