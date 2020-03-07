'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/todos/list', controller.todo.queryData);
  router.post('/api/todos/add', controller.todo.addItem);
  router.post('/api/todos/delete', controller.todo.removeItem);
  router.post('/api/todos/selectAll', controller.todo.selectAll);
  router.post('/api/todos/changeSelect', controller.todo.changeStatus);
  router.post('/api/todos/clearCompleted', controller.todo.clearCompleted);
  router.all('*', controller.todo.index);
};
