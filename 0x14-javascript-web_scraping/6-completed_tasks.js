#!/usr/bin/node

const request = require('request');
const url = process.argv[2];

request(url, function (err, response, body) {
  if (err) {
    console.error('An error occurred:', err);
  } else if (response.statusCode === 200) {
    try {
      const completed = {};
      const tasks = JSON.parse(body);
      for (const i in tasks) {
        const task = tasks[i];
        if (task.completed === true) {
          if (completed[task.userId] === undefined) {
            completed[task.userId] = 1;
          } else {
            completed[task.userId]++;
          }
        }
      }
      console.log(completed);
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  } else {
    console.error('An error occurred. Status code:', response.statusCode);
  }
});
