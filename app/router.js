'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 获取列表数据
  router.post('/api/todos/list', controller.todo.index);

  // 添加数据
  router.post('/api/todos/add', controller.todo.addItem);

  // 删除单条数据
  router.post('/api/todos/delete', controller.todo.removeItem);
  
  // 全选，全不选
  router.post('/api/todos/selectAll', controller.todo.selectAll);

  // 改变单条数据状态
  router.post('/api/todos/changeSelect', controller.todo.changeStatus);

  // 清除完成数据
  router.post('/api/todos/clearCompleted', controller.todo.clearCompleted);

  // 兜底
  router.all('*', controller.todo.index);
};
