const db = require("../models");
const Order = db.order;

// Create and Save a new Order
exports.create = (req, res) => {
    // Create a Order
    const order = new Order({
        userId: req.userId,
        productId: req.body.productId,
        orderCode: "ORD" + Math.floor(Math.random() * 10000),
        orderDate: req.body.orderDate,
        requiredDate: req.body.requiredDate,
        shippedDate: req.body.shippedDate
    });

    // Save Order in the database
    order
        .save(order)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Order."
            });
        });
};

// Retrieve all order from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    let { page, size } = req.query;
    if (!page) {
        page = 1;
    }
    if (!size) {
        size = 10;
    }
    const limit = parseInt(size);
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Order.find(condition).sort(
        { _id: -1 }).limit(limit)
        .then(data => {
            res.send({
                page,
                size,
                data: data,
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving order."
            });
        });
};

// Find a single Order with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Order.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Order with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Order with id=" + id });
        });
};

// Update a Order by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Order with id=${id}. Maybe Order was not found!`
                });
            } else res.send({ message: "Order was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Order with id=" + id
            });
        });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Order.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
                });
            } else {
                res.send({
                    message: "Order was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Order with id=" + id
            });
        });
};

// Delete all order from the database.
exports.deleteAll = (req, res) => {
    Order.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} order were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all order."
            });
        });
};
