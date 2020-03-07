const { Service } = require('egg');

class TodoService extends Service {
    // 获取列表数据
    async getList() {
        const { ctx } = this;
        const list = await ctx.model.Todos.findAll();
        return list;
    }

    // 添加数据
    async addItem(data) {
        const { ctx } = this;
        const { value, checked } = data;

        const todos = await ctx.model.Todos.create({
            value,
            checked: checked || 0
        })

        return todos;
    }

    // 全选，全不选
    async changeTodos(isSelected) {
        const { ctx, app } = this;
        const todos = await ctx.model.Todos.update({
            checked: isSelected
        }, {
            where: {
                checked: {
                    [app.Sequelize.Op.ne]: isSelected 
                }
            }
        })

        return todos;
    }

    // 单挑数据状态改变
    async changeSelect(obj) {
        const { id, checked } = obj;
        const { ctx } = this;

        const result = await ctx.model.Todos.update({
            checked
        }, {
            where: {
                id
            }
        })
        return result;
    }

    // 清除完成数据
    async clearCompleted() {
        const { ctx } = this;

        const ids = await ctx.model.Todos.destroy({
            where: {
                checked: 1
            }
        })

        return ids;
    }

    // 删除单条数据
    async removeItem(id) {
        const { ctx } = this;

        return await ctx.model.Todos.destroy({
            where: {
                id
            }
        })
    }
}

module.exports = TodoService;