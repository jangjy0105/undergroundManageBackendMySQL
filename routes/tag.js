const { Router, query } = require('express');
const { Tags } = require('../data/tags');
const { Movies } = require('../data/movies');
const { getListLength } = require('../functions/getListLength');
const { getList } = require('../functions/getList');

const router = Router();

router.get('/getTag', async(req, res) => {
  const data = await Tags.find();
  // var tagNames = [];
  // data.map((tag) => {
  //   tagNames.push(tag.tagName)
  // })
  res.send(data);
})

router.post('/getLength', (req, res) => {  

  const objFields = ['movies'];
  const objFieldDatas = ['movieTitle'];

  getListLength(Tags, req.body.queryData, res, objFields, objFieldDatas);
  
})

router.post('/upload', (req, res) => {
  const data = req.body;
  data.date = new Date()
  console.log(data);
  const saveTag = new Tags(data);
  saveTag.save();
})

router.post('/getTagList', async(req, res) => {

  const objFields = ['movies'];
  const objFieldDatas = ['movieTitle'];

  const data = await getList(Tags, req.body, objFields, objFieldDatas, 'tagName');
  
  res.send(data);
})

// router.post('/tagid', async(req, res) => {

//   // var movies = await Movies.find();
//   var movies = await Movies.find(); 

//   for (let i=0; i<data.length; i++) {
//     var idArray = [];
//     for (let j=0; j<data[i].length; j++){
//       idArray.push(data[i][j]);
//       // console.log();
//     }
//     console.log(idArray);
    
//     await Movies.updateOne({title: movies[i].title}, {$set:{tags: idArray}})
//   }

//   console.log(data.length)
// })

// router.post('/tagid', async(req, res) => {

//   var tagData = await Tags.find();
//   var movieData = await Movies.find();

//   for (let i=0; i<tagData.length; i++) {
//     var idArray = [];
//     for (let j=0; j<movieData.length; j++){
//       // console.log(movieData[j].tags)
//       if (movieData[j].tags.includes(tagData[i]._id)){
//         idArray.push(movieData[j]._id);
//         // console.log('hi');
//       }
//       // idArray.push(tagId._id);
//     }
//     console.log(idArray);
//     // console.log(data[i].title)
//     await Tags.updateOne({tagName: tagData[i].tagName}, {$set:{movies: idArray}})
//   }

// })

module.exports = router;