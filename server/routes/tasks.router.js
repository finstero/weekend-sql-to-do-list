const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');


router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "priority";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch (error => {
    console.log('error getting into koalas table', error);
    res.sendStatus(500);
    });
});





module.exports = router