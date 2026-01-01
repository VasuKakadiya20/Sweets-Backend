const express = require('express');
const { Order } = require('../models/order');
const router = express.Router()

// create - Client Side
router.post('/create', async (req, res) => {
  try {
    const lastOrder = await Order.findOne().sort({ _id: -1 });

    let nextNumber = 1;
    if (lastOrder && lastOrder.OrderID) {
      const numericPart = parseInt(lastOrder.OrderID, 10);

      if (!isNaN(numericPart)) {
        nextNumber = numericPart + 1;
      }
    }

    const OrderID = nextNumber.toString().padStart(4, "0");

    const { userid, Firstname, Lastname, Phonenumber, Email, Landmark, Pin_code, City, State, shipping_Charge, Total, Date, items, Status, Payment_method } = req.body;

    if (!userid || !Firstname || !Lastname || !Phonenumber || !Email || !Landmark || !Pin_code || !City || !State || !Total || !Date) {
      return res.status(400).json({ msg: "All fields required!" });
    }

    const order = new Order({
      OrderID,
      userid,
      Firstname,
      Lastname,
      Phonenumber,
      Email,
      Landmark,
      Pin_code,
      City,
      State,
      items,
      shipping_Charge,
      Total,
      Date,
      Status,
      Payment_method,
    });

    const Ordersave = await order.save();
    res.status(201).json({ message: "Order Added Successfully!", Ordersave });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Admin to ALL Showing
router.get('/', async (req, res) => {
  try {
    const order = await Order.find({})
    res.json(order)
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
})

// Client All Order Showing 
router.get('/User/:id', async (req, res) => {
  const userid = req.params.id;

  try {
    const Orderinfo = await Order.find({ userid });
    return res.status(200).json(Orderinfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Id to
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
    try {
        let updatedata = {
          Status:req.body.Status,
        };

        const order = await Order.findByIdAndUpdate(req.params.id, updatedata, { new: true });

        if (!order) {
            return res.status(404).json({ message: "Update failed", status: false });
        }

        res.status(200).json({ message: "order updated!", status: true, order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;