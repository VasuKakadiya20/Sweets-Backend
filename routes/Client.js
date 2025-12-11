const express = require('express');
const { Client } = require('../models/Client');
const router  = express.Router();
const bcrypt = require("bcrypt");

router.post('/create', async (req, res) => {
    try {
        const { Firstname, Lastname, phonenumber, Email, password } = req.body;

        if (!Firstname || !Lastname || !phonenumber || !Email || !password) {
            return res.status(400).json({ msg: "All fields required!" });
        }

        const existing = await Client.findOne({ Email });
        if (existing) {
            return res.status(400).json({ msg: "Email already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let client = new Client({
            Firstname,
            Lastname,
            phonenumber,
            Email,
            password: hashedPassword
        });

        client = await client.save();
        res.status(201).json({
            message: "Client Added Successfully!",
            client
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req,res) =>{
 try {
        const client = await Client.find({});
        res.json(client);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/loginuser", async (req, res) => {
  const { Email, password } = req.body;

  try {
    const user = await Client.findOne({ Email });
    if (!user) {
      return res.status(404).json({ msg: "Email not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password!" });
    }

    return res.status(200).json({
      msg: "Login successful!",
      user: {
        id: user._id,
        Firstname: user.Firstname,
        Lastname: user.Lastname,
        Email: user.Email,
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

// router.delete('/:id',async(req,res)=>{
//     try{
//          const deleteclient = await Client.findById(req.params.id);
//             if (!deleteclient) {
//               return res.status(404).json({ message: 'Item not found' });
//             }
//             res.status(200).json(deleteclient);
//     }catch(error){
//         console.error(error)
//         res.status(500).json({error:error.message})
//     }
// })

router.get("/:id", async (req, res) => {
    try {
        const fetchclient = await Client.findById(req.params.id);

        if (!fetchclient) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json(fetchclient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!client) {
      return res.status(404).json({ message: "Update failed", status: false });
    }

    res.status(200).json({
      message: 'Client updated!',
      status: true,
      client
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;