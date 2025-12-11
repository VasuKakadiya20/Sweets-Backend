const express = require('express');
const router  = express.Router();
const bcrypt = require("bcrypt");
const { user } = require('../models/user');

router.post('/create', async (req, res) => {
    try {
        const { Firstname, Lastname, phonenumber, Email, password } = req.body;

        if (!Firstname || !Lastname || !phonenumber || !Email || !password) {
            return res.status(400).json({ msg: "All fields required!" });
        }

        const existing = await user.findOne({ Email });
        if (existing) {
            return res.status(400).json({ msg: "Email already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let Userinfo = new user({
            Firstname,
            Lastname,
            phonenumber,
            Email,
            password: hashedPassword
        });

        usersave = await Userinfo.save();
        res.status(201).json({
            message: "User Added Successfully!",
            usersave
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req,res) =>{
 try {
        const userinfo = await user.find({});
        res.json(userinfo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/loginuser", async (req, res) => {
  const { Email, password } = req.body;

  try {
    const userinfo = await user.findOne({ Email });
    if (!userinfo) {
      return res.status(404).json({ msg: "Email not found!" });
    }

    const isMatch = await bcrypt.compare(password, userinfo.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password!" });
    }

    return res.status(200).json({
      msg: "Login successful!",
      userinfo: {
        id: userinfo._id,
        Firstname: userinfo.Firstname,
        Lastname: userinfo.Lastname,
        Email: userinfo.Email,
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});


router.get("/:id", async (req, res) => {
    try {
        const fetchuser = await user.findById(req.params.id);

        if (!fetchuser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(fetchuser);
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

    const userinfo = await user.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!userinfo) {
      return res.status(404).json({ message: "Update failed", status: false });
    }

    res.status(200).json({
      message: 'user updated!',
      status: true,
      userinfo
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;