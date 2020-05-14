const express = require("express");
const router = express.Router();
const axios = require("axios");
const md5 = require("md5");
const uid2 = require("uid2");

router.get("/comics", async (req, res) => {
  try {
    const ts = uid2(8);
    /* console.log(ts); */
    const hash = md5(
      ts +
        process.env.MARVEL_API_PRIVATE_KEY +
        process.env.MARVEL_API_PUBLIC_KEY
    );

    /*  md5(ts+privateKey+publicKey) */
    let offset = req.query.offset;

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?offset=${offset}&ts=${ts}&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=${hash}`
    );
    console.log("ici ===>", response.data);
    res.json(response.data);
  } catch (error) {
    console.log("error", error.message);
  }
});

router.get("/characters", async (req, res) => {
  try {
    const ts = uid2(8);
    /* console.log(ts); */
    const hash = md5(
      ts +
        "dbea675b8232dc71aa4005b5294d549c77636c1a" +
        "ac45538ad982b370631ff48ded9c769f"
    );

    /*   let characterId = req.params.characterId; */
    let offset = req.query.offset;

    /*  md5(ts+privateKey+publicKey) */

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?offset=${offset}&ts=${ts}&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=${hash}`
    );
    res.json(response.data);
  } catch (error) {
    console.log("error", error.message);
  }
});

module.exports = router;
