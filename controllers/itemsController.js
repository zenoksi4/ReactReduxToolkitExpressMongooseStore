const Item = require('../models/itemModel');


const getItems = async (req, res) => {
    try {
        const items = await Item.find();

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: `Failed to get list items, please try again. error: ${error}`});
    }
};

const createItem = async (req, res) => {
    const errors = {};

    if (!req.body.name) {
        errors.name = {message: `Please enter a name ${req.body.name}`}
    }

    if (!req.body.price || req.body.price < 0) {
        errors.price = {message: "Please enter a price"}
    }

    if (!req.body.exterior) {
        errors.exterior = {message: "Please enter a exterior"}
    }

    if (!req.body.category) {
        errors.category = {message: "Please enter a category"}
    }

    if (!req.body.itemImage) {
        errors.itemImage = {message: "Please enter a photo"}
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }

    try {
        const { name, price, exterior, category, itemImage} = req.body;

        const item = await Item.create({
            name, 
            price, 
            exterior, 
            category, 
            itemImage
        });
        
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: `Failed to create item, please try again. error: ${error} `});
    }
};

const getItemById = async (req, res) => {
    try {
        const item = await Item.find({ _id: req.params.id});

        res.status(200).json(item)
    } catch(error) {
        res.status(400).json({ message: `Failed to get item by id, please try again. error: ${error} `});
    }
}


const deleteItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteItem = await Item.findByIdAndDelete(id);


        if (!deleteItem) {  
            return res.status(404).send('Item not found');
            }


        res.send(deleteItem);

    } catch(error) {
        res.status(500).send(`Failed to delete item: ${error}`);
    }
}

module.exports = {
    getItems,
    createItem,
    getItemById,
    deleteItemById
}