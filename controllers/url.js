const {nanoid} = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortURL (req, res) {
    const body = req.body;

    if (!body.url){
        return res.status(400).json({error: "URL is required"});
    }

    const shortID = nanoid(8);  //////////////////////////////////////////////
                                                                            //
    await URL.create({                                                      //
        shortId: shortID,   //word shortId is from database and the word shortID is from function that stores the nanoid
        redirectURL: body.url,
        visitHistory: [],    
    });

    return res.json({id : shortID});
}

module.exports = {
    handleGenerateNewShortURL, 
};
