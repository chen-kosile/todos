const { Controller } = require('egg');
const { join } = require('path');
const server = require('umi-server');
const { Helmet } = require('react-helmet');

const handlerTitle = $ => {
  try {
    const helmet = Helmet.renderStatic();
    const title = helmet.title.toString();
    $('head').prepend(title);
  } catch (e) {
    this.ctx.logger.error('postProcessHtml title', e);
  }
  return $;
};

class TodoController extends Controller {
  constructor(props) {
    super(props);
    this.root = join(__dirname, '..', 'public');
  }
  async index() {
    const { ctx } = this;
    global.host = `${ctx.request.protocol}://${ctx.request.host}`;
    global.href = ctx.request.href;
    const render = server({
      root: this.root,
      polyfill: false,
      postProcessHtml: [handlerTitle],
      dev: ctx.app.config.env === 'local',
    });
    const { ssrHtml, matchPath } = await render({
      req: {
        url: ctx.request.url,
      },
    });
    if (!matchPath) {
      ctx.body = '404 Not Found';
      return;
    }
    ctx.body = ssrHtml;
  }

  async queryData() {
    const { ctx } = this;
    const dataList = await ctx.service.todo.getList();
    const data = await ctx.service.selectall.query();
    ctx.returnBody(200, '获取成功', {
      dataList,
      selectAll: data.selectAll
    });
  }

  async addItem() {
    const { ctx } = this;
    const { value, checked } = ctx.request.body;

    await ctx.service.todo.addItem({ value, checked });
    await ctx.service.selectall.update();

    ctx.returnBody(200, "添加成功")
  }

  async deleteItem() {
    const { ctx } = this;
    const { id } = ctx.request.body;

    await ctx.service.todo.deleteItem(id);

    ctx.returnBody(200, '删除成功');
  }

  async selectAll() {
    const { ctx } = this;
    const { selectAll } = ctx.request.body;
    let isSelect = selectAll === 'true' ? 1 : 0;

    await ctx.service.todo.changeTodos(isSelect);
    await ctx.service.selectall.changeSelect(isSelect);

    ctx.returnBody(200, '成功');
  }

  async changeStatus() {
    const { ctx } = this;
    const { id, checked } = ctx.request.body;

    const todo = await ctx.service.todo.changeSelect({id, checked});
    const dataList = await ctx.service.todo.getList();
    const data = await ctx.service.selectall.query();

    if (dataList.some(item => item.checked === false) && data.selectAll === true) {
      await ctx.service.selectall.changeSelect(0);
    } else if (dataList.every(item => item.checked === true) && data.selectAll === false) {
      await ctx.service.selectall.changeSelect(1);
    }
    ctx.returnBody(200, '状态修改成功', {
      status: todo
    })
  }

  async clearCompleted() {
    const { ctx } = this;

    const ids = await ctx.service.todo.clearCompleted();

    ctx.returnBody(200, '清除成功', ids)
  }

  async removeItem() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const todo = await ctx.service.todo.removeItem(id);

    ctx.returnBody(200, '删除成功', todo);
  }
}

module.exports = TodoController;
