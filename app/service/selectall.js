const { Service } = require('egg');

class SelectAllService extends Service {
    async query() {
        const { ctx } = this;
        const data = await ctx.model.Selectalls.findOne();
        return data;
    }

    async update() {
        const { ctx } = this;
        const selectAll = await ctx.model.Selectalls.update({
            selectAll: 0
        }, {
            where: {
                id: 1
            },
            fields: ['selectAll']
        })
        return selectAll;
    }

    async changeSelect(isSelect) {
        const { ctx } = this;
        const changeSelect = await ctx.model.Selectalls.update({
            selectAll: isSelect
        }, {
            where: {
                id: 1
            },
            fields: ['selectAll']
        })

        return changeSelect;
    }
}

module.exports = SelectAllService;