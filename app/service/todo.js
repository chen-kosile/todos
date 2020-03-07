const { Service } = require('egg');

class TodoService extends Service {
    async getList() {
        const { ctx } = this;
        const list = await ctx.model.Todos.findAll();
        return list;
    }

    async addItem(data) {
        const { ctx } = this;
        const { value, checked } = data;

        const todos = await ctx.model.Todos.create({
            value,
            checked: checked || 0
        })

        return todos;
    }

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

    async clearCompleted() {
        const { ctx } = this;

        const ids = await ctx.model.Todos.destroy({
            where: {
                checked: 1
            }
        })

        return ids;
    }

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