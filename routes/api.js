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

const manager = require('./manager');
router.use('/manager', manager)

module.exports = router;