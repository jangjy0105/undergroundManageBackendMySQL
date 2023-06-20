const { Router } = require('express');
// const mysql = require('mysql2');
const connection = require('../db');
// const { Notices } = require('../data/notices');
// const { getList } = require('../functions/getList');
// const { getTotalLength } = require('../functions/getTotalLength');
// const { upload } = require('../functions/upload');

const router = Router();

router.post('/getLength', (req, res) => {
  // const dateFields = ['date'];
  // getTotalLength(Notices, req.body, res, [], dateFields);
})

router.post('/upload', (req, res) => {
  const insertQuery = 'INSERT INTO notice (noticeTitle, noticeContent) VALUES (?,?)';
  const notice = req.body;
  // upload(Notices, data);
  const values = [notice.noticeTitle, notice.noticeContent];
  connection.query(insertQuery, values, (error, results, fields) => {
    if (error) console.error(error);
    else console.log('생성 성공');
  })
})

router.post('/getList', async(req, res) => {

  const selectQuery = "SELECT * FROM notice WHERE noticeTitle = '검색기능 실험용' ORDER BY createdDate DESC";
  connection.query(selectQuery, (error, results, fields) => {
    if(error) console.error(error);
    else {
      console.log(results);
      res.send(results);
    }
  })
  // const dateFields = ['date'];
  // await getList(Notices, req.body, [], dateFields, 'noticeName', res); 

})

router.post('/delete', async(req, res) => {
  await Notices.deleteMany({ _id: { $in: req.body } });
})

module.exports = router