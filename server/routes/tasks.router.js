const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');


router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "priority";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch (error => {
    console.log('error getting into koalas table', error);
    res.sendStatus(500);
    });
});

router.post('/',  (req, res) => {
    let newTask = req.body;
    console.log(`Adding book`, newTask);
  
    let queryText = `INSERT INTO "tasks" ("task", "notes")
                     VALUES ($1, $2);`;
    pool.query(queryText, [newTask.task, newTask.notes])
      .then( result => {
        res.sendStatus(201);
      })
      .catch( error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
  });

  router.delete('/:id', (req, res) => {
    const taskToDelete = req.params.id;
    console.log('item to delete', taskToDelete);
    const queryString = `DELETE FROM "tasks" WHERE "tasks".id = $1;`
  
    pool.query(queryString, [taskToDelete])
    .then( response => {
      console.log(`deleted task with id ${taskToDelete}`);
      res.sendStatus(200);
    })
    .catch( error => {
      console.log('error in delete', error);
      res.sendStatus(500);
    });
  });

router.put('/:id', (req, res) => {
    const taskId = req.params.id;

    // let completeStatus = req.body.completeStatus;

    const queryString = 'UPDATE "tasks" SET "complete"=true WHERE "tasks".id = $1;';

    pool.query(queryString, [taskId])
    .then (response => {
      console.log(response.rowCount);
      res.sendStatus(202);
    }).catch (error => {
      console.log('error in put', error);
      res.sendStatus(500);
    })
});



module.exports = router