const express = require('express')
const { Review } = require('../models/review')
const router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const review = await Review.find({})
         res.json(review)
    }catch (err){
        console.error(err)
         res.status(500).json({error:err.message})
    }
});

router.post('/create', async (req, res) => {
    try {
        const { userid, Name, Email, Rating, Review_Title, Review_msg ,Date} = req.body;

        if (!userid || !Name || !Email || !Rating || !Review_Title || !Review_msg || !Date) {
            return res.status(400).json({ msg: "All fields required!" });
        }

        let review = new Review({
            userid,
            Name,
            Email,
            Rating,
            Review_Title,
            Review_msg,
            Date
        });
        reviewsave = await review.save();
        res.status(201).json({ message: "Review Added Succefully !", reviewsave });
        console.log("Review added", reviewsave)

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;