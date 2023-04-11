const { Router } = require('express');

const router = Router();

const stats = require('./stats');
router.use('/stats',stats)

const movie = require('./movie');
router.use('/movie', movie) 

const tag = require('./tag');
router.use('/tag', tag) 

const notice = require('./notice');
router.use('/notice', notice)

const admin = require('./admin');
router.use('/admin', admin)

const deletedMovie = require('./deletedMovie');
router.use('/deletedMovie', deletedMovie)

module.exports = router;