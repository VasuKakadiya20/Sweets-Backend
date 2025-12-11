const { Cart } = require("../models/Cart");
const express = require('express')
const router = express.Router()

router.post('/create', async (req, res) => {
    try {
        const { userid, itemid, qty, producttitle, price, totalprice ,itemimg } = req.body;

        if (!userid || !itemid || !qty || !producttitle || !price || !totalprice || !itemimg) {
            return res.status(400).json({ msg: "All fields required!" });
        }

        let cart = new Cart({
            userid,
            itemid,
            qty,
            producttitle,
            price,
            totalprice,
            itemimg
        });
        cartsave = await cart.save();
        res.status(201).json({ message: "Client Added Succefully !", cartsave });
        console.log("client added", cartsave)

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const cart = await Cart.find({});
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletecart = await Cart.findByIdAndDelete(req.params.id);
        if (!deletecart) {
            return res.status(404).json({ message: 'Cart Item not found' });
        }
        res.status(200).json({ message: "Cart Item Removing !", deletecart });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
});

router.put('/:id', async (req, res) => {
    try {
        let updatedata = {
            qty: req.body.qty,
            price: req.body.price,
            totalprice: req.body.totalprice
        };

        const cart = await Cart.findByIdAndUpdate(req.params.id, updatedata, { new: true });

        if (!cart) {
            return res.status(404).json({ message: "Update failed", status: false });
        }

        res.status(200).json({ message: "Cart updated!", status: true, cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


router.get('/:id', async (req, res) => {
    const userid = req.params.id;  

    try {
        const Cartinfo = await Cart.find({ userid });
        return res.status(200).json(Cartinfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;