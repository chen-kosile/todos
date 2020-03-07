const { Service } = require('egg');

class SelectAllService extends Service {
    
    // 查询多选数据
    async query() {
        const { ctx } = this;
        const data = await ctx.model.Selectalls.findOne();
        return data;
    }

    // 更新数据
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

    // 更新数据
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