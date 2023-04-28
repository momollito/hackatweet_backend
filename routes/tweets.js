const express = require("express");
const router = express.Router();
const Tweet = require("../models/tweet");
const uid2 = require('uid2');


const token = uid2(32);

/* CREATE TWEET/ tweets/ */

router.post("/", (req, res) => {

    const newTweet = new Tweet({
        image: 'https://m0.her.ie/wp-content/uploads/2015/06/19145708/MyspaceTom.jpg',
        firstname: req.body.firstname,
        username: req.body.username,
        tweet: req.body.tweet,
        date: new Date(),
        likes: 0,
        token: token,
      });

      newTweet.save().then(newDoc => {
        res.json({ result: true, newDoc });
      });
  
});

/* GET ALL TWEET/ tweets/ */
router.get("/", (req, res) => {
    Tweet.find().then(data => {
		res.json({ tweets: data });
	});
})

/* DELETE TWEET/ tweets/ */

router.delete("/", (req, res) => {
    Tweet.deleteOne({
      token: req.body.token,
    }).then(deletedDoc => {
      if (deletedDoc.deletedCount > 0) {
        // document successfully deleted
        Tweet.find().then(data => {
          res.json({ result: true, tweet: data });
        });
      } else {
        res.json({ result: false, error: "Tweet not found" });
      }
    });
  });


  /* UPDATE LIKES COUNT / tweets/ */

router.put("/", (req, res) => {
    Tweet.updateOne(
      {token: req.body.token},
      {likes: req.body.likes}
    ).then(() => {
        Tweet.find().then(data => {
          res.json({ result: true, tweet: data });
        });
    });
  });




module.exports = router;
