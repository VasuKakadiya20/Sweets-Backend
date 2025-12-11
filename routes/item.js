// const express = require('express');
// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { items } = require('../models/item');
// const router = express.Router();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });
// const upload = multer({ storage });

// router.get('/', async (req, res) => {
//     try {
//         const Item = await items.find();
//         if (!Item) {
//             return res.status(500).json({ success: false });
//         }
//         res.send(Item);
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // router.post('/create', upload.array('images', 4), async (req, res) => {
// //     try {
// //         let uploadedImages = [];

// //         if (req.files && req.files.length > 0) {
// //             for (let file of req.files) {
// //                 const result = await cloudinary.uploader.upload(file.path, {
// //                     folder: 'Items',
// //                 });
// //                 uploadedImages.push(result.secure_url);
// //                 fs.unlinkSync(file.path);
// //             }
// //         }
// //             console.log("this is img uploaded",uploadedImages)
// //         let newitem = new items({
// //             itemtitle: req.body.itemtitle,
// //             price: req.body.price,
// //             Description: req.body.Description,
// //             images: uploadedImages,
// //         });

// //         const SaveItem = await newitem.save();
// //         res.status(201).json({message: "Item Added !",SaveItem});
// //         console.log(SaveItem)

// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ error: err.message });
// //     }
// // });

// router.post('/create', async (req, res) => {
//     try {
//         const { itemtitle, price, Description, images } = req.body;

//         if (!images || !Array.isArray(images)) {
//             return res.status(400).json({ message: "Images must be an array of URLs" });
//         }

//         let newitem = new items({
//             itemtitle,
//             price,
//             Description,
//             images 
//         });

//         const SaveItem = await newitem.save();
//         res.status(201).json({ message: "Item Added!", SaveItem });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     }
// });


// router.get('/:id', async (req, res) => {
//     try {
//         const Item = await items.findById(req.params.id);
//         if (!Item) {
//             return res.status(404).json({ message: 'Item not found' });
//         }
//         res.status(200).json(Item);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     const deleteitem = await items.findByIdAndDelete(req.params.id);
//     if (!deleteitem) {
//         return res.status(404).json({ message: "Item not found!", status: false });
//     }
//     res.status(200).json({ message: "Item deleted!", status: true });
// });

// router.put('/:id', upload.array('images', 4), async (req, res) => {
//     try {
//         let updateData = {
//             itemtitle: req.body.itemtitle,
//             price: req.body.price,
//             Description: req.body.Description
//         };

//         let newImages = [];
//         if (req.files && req.files.length > 0) {
//             for (let file of req.files) {
//                 const result = await cloudinary.uploader.upload(file.path, {
//                     folder: 'Items',
//                 });
//                 newImages.push(result.secure_url);
//                 fs.unlinkSync(file.path);
//             }
//             updateData.images = newImages;
//         }

//         const updateitem = await items.findByIdAndUpdate(
//             req.params.id,
//             updateData,
//             { new: true }
//         );

//         if (!updateitem) {
//             return res.status(404).json({ message: 'Update failed', status: false });
//         }

//         res.status(200).json({ message: 'Items updated!', status: true, updateitem });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;

const express = require("express");
const { items } = require("../models/item");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
    try {
        const Item = await items.find();
        res.status(200).json(Item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/create", upload.array("images", 4), async (req, res) => {
    try {
        let uploadedImages = [];

        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "Items",
                });

                uploadedImages.push(result.secure_url);

                fs.unlinkSync(file.path);
            }
        }

        let newitem = new items({
            itemtitle: req.body.itemtitle,
            price: req.body.price,
            Description: req.body.Description,
            images: uploadedImages,  
        });

        const SaveItem = await newitem.save();

        res.status(201).json({
            message: "Item Added Successfully!",
            SaveItem,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const Item = await items.findById(req.params.id);

        if (!Item) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(Item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    const deletedItem = await items.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
        return res.status(404).json({ message: "Item not found", status: false });
    }

    res.status(200).json({ message: "Item deleted!", status: true });
});

router.put("/:id", upload.array("images", 4), async (req, res) => {
  try {
    const existingItem = await items.findById(req.params.id);
    if (!existingItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    let updateData = {
      itemtitle: req.body.itemtitle,
      price: req.body.price,
      Description: req.body.Description,
      images: existingItem.images || [], 
    };


    if (req.files && req.files.length > 0) {
      const newImages = [];
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "Items",
        });
        newImages.push(result.secure_url);
        fs.unlinkSync(file.path);
      }

      updateData.images = [...updateData.images, ...newImages];
    }

    const updatedItem = await items.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Item Updated Successfully!",
      updatedItem,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;