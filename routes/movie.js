const { Router, query } = require('express');
const connection = require('../db');
// const { Movies } = require('../data/movies');
// const { DeletedMovies } = require('../data/deletedMovies');
// const { Tags } = require('../data/tags');
// const { getList } = require('../functions/getList');
// const { getTotalLength } = require('../functions/getTotalLength');
// const { deleteData } = require('../functions/deleteData');
// const { upload } = require('../functions/upload');

const router = Router();

// router.post('/getLength', (req, res) => {  
  
//   const populateOptions = [{schema: Tags, field: 'tags', data: 'tagName'}];
//   const dateFields = ['date'];

//   getTotalLength(Movies, req.body, res, populateOptions, dateFields);

// })

router.post('/upload', async(req, res) => {
  const movieInfo = req.body
  const movieInsertQuery = "INSERT INTO movie (title, summary, rating, specialNote) VALUES (?, ?, ?, ?)";
  const movieInsertValues = [movieInfo.title, movieInfo.summary, movieInfo.rating, movieInfo.specialNote];

  connection.beginTransaction((error) => {
    if(error) {
      console.log(error)
      return;
    }
    
      connection.query(movieInsertQuery, movieInsertValues, (error, movieResult) => {
        if (error) {
          console.log(error);
          return;
        }
          const movieId = movieResult.insertId;
          const movie_directorInsertQuery = "INSERT INTO movie_director (movieId, filmPeopleId) VALUES (?, ?)";
          const movie_screenwriterInsertQuery = "INSERT INTO movie_screenwriter (movieId, filmPeopleId) VALUES (?, ?)";
          const movie_actorInsertQuery = "INSERT INTO movie_actor (movieId, filmPeopleId) VALUES (?, ?)";
          const movie_genreInsertQuery = "INSERT INTO movie_genre (movieId, genreId) VALUES (?, ?)";
          const movie_tagInsertQuery = "INSERT INTO movie_tag (movieId, tagId) VALUES (?, ?)";
          const filmograpyInsertQuery = "INSERT INTO movie_tag (filmPeopleId, movieId, roleType) VALUES (?, ?, ?)";
          
          const movie_directorInsertPromise = movieInfo.directors.map((director) => {
            return new Promise((resolve, reject) => {
              connection.query(movie_directorInsertQuery, [movieId, director], (error) => {
                if(error){
                  reject(error);
                  return;
                }
                resolve();
              })
            })
          })
          
          const movie_screenwriterInsertPromise = movieInfo.screenwriters.map((screenwriter) => {
            return new Promise((resolve, reject) => {
              connection.query(movie_screenwriterInsertQuery, [movieId, screenwriter], (error) => {
                if(error){
                  reject(error);
                  return;
                }
                resolve();
              })
            })
          })
          
          const movie_actorInsertPromise = movieInfo.actors.map((actor) => {
            return new Promise((resolve, reject) => {
              connection.query(movie_actorInsertQuery, [movieId, actor], (error) => {
                if(error){
                  reject(error);
                  return;
                }
                resolve();
              })
            })
          })
          
          const movie_genreInsertPromise = movieInfo.genres.map((genre) => {
            return new Promise((resolve, reject) => {
              connection.query(movie_genreInsertQuery, [movieId, genre], (error) => {
                if(error){
                  reject(error);
                  return;
                }
                resolve();
              })
            })
          })


          const movie_tagInsertPromise = movieInfo.tags.map((tag) => {
            return new Promise((resolve, reject) => {
              connection.query(movie_tagInsertQuery, [movieId, tag], (error) => {
                if(error){
                  reject(error);
                  return;
                }
                resolve();
              })
            })
          })
          Promise.all([...movie_directorInsertPromise, ...movie_screenwriterInsertPromise, ...movie_actorInsertPromise, ...movie_genreInsertPromise, ...movie_tagInsertPromise])
          .then(() => {
            connection.commit((commitError) => {
              if (commitError) {
                console.error('커밋 오류:', commitError);
                connection.rollback(() => {
                  console.log('트랜잭션 롤백');
                  connection.end();
                });
                return;
              }
              console.log('데이터 생성이 완료되었습니다.');
              // connection.end();
            });
          })
          .catch((insertError) => {
            console.error('연결 테이블 데이터 생성 오류:', insertError);
            connection.rollback(() => {
              console.log('트랜잭션 롤백');
              connection.end();
            });
          });
        
      })
    
      
  })
})

// router.post('/getList', async(req, res) => {
  
//   const populateOptions = [{schema: Tags, field: 'tags', data: 'tagName'}];
//   const dateFields = ['date'];

//   await getList(Movies, req.body, populateOptions, dateFields, 'title', res);

//   // res.send(data);
// })

// router.post('/getDetail', async(req, res) => {
//   Movies.findById(req.body.id)
//   .then(data => res.json(data))
//   .catch(err => res.send(err));
// })

// router.post('/delete', async (req, res) => {
//   deleteData(Movies, DeletedMovies, req.body, [Tags], [])
// })

// router.post('/open', (req, res) => {
//   console.log(req.body+'공개');
// })

// router.post('/close', (req, res) => {
//   console.log(req.body+'미공개');
// })



module.exports = router;