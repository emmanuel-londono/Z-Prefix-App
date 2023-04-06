else if (req.body.quantity && req.body.new_quantity) {
    let { quantity, new_quantity } = req.body;
    return knex("user")
        .where("quantity", quantity)
        .modify((queryBuilder) => queryBuilder.update({ quantity: new_quantity })).then(() => { console.log(`New quantity accepted! ${new_quantity}`); return res.status(202).json({ "msg": `New quantity accepted!` }) })
}
