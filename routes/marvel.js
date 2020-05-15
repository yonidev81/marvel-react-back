const express = require("express");
const router = express.Router();
const axios = require("axios");
const md5 = require("md5");
const uid2 = require("uid2");

router.get("/comics", async (req, res) => {
  try {
    const offset = req.query.offset;
    console.log(offset);
    const ts = uid2(8);
    /* console.log(ts); */
    const hash = md5(
      ts +
        process.env.MARVEL_API_PRIVATE_KEY +
        process.env.MARVEL_API_PUBLIC_KEY
    );

    /*  md5(ts+privateKey+publicKey) */

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
        process.env.MARVEL_API_PRIVATE_KEY +
        process.env.MARVEL_API_PUBLIC_KEY
    );

    /*   let characterId = req.params.characterId; */
    let offset = req.query.offset;

    /*  md5(ts+privateKey+publicKey) */

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?offset=${offset}&ts=${ts}&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=${hash}`
    );
    res.json(response.data);
  } catch (error) {
    error.message;
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    let ts = uid2(8);
    let hash = md5(
      ts +
        process.env.MARVEL_API_PRIVATE_KEY +
        process.env.MARVEL_API_PUBLIC_KEY
    );
    let characterId = req.params.characterId;

    let offset = req.query.offset;

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/${characterId}/comics?offset=${offset}&ts=${ts}&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=${hash}`
    );
    res.json(response.data);
  } catch (error) {
    error.message;
  }
});

module.exports = router;
