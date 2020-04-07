const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const PORT = 8000;
const ACCESS_TOKEN = '517423305835801';
const API_ENDPOINT = `https://superheroapi.com/api/${ACCESS_TOKEN}`;

const SUCCESS = 'success';

const MARVEL_IDS = {
    BLACK_PANTHER: 106,
    BLACK_WIDOW: 107,
    ANTMAN: 30,
    CAPITAN_MARVEL: 156,
    GAMORA: 275,
    HULK: 332,
    IRON_MAN: 346,
    LOKI: 414,
    NEBULA: 487,
    NICK_FURY: 489,
    ROCKET_RACOON: 566,
    SCARLET_WITCH: 577,
    SPIDER_MAN: 620,
    STAR_LORD: 630,
    THOR: 659,
    VISION: 697,
    WASP: 708,
    WINTER_SOLIDER: 714,
    CAPITAN_AMERICA: 149,
    HAWKEYE: 313,
    GROOT: 303,
    DRAX: 234,
    WAR_MACHINE: 703,
    DOCTOR_STRANGE: 226,
    HOWARD_THE_DUCK: 331,
};

const DATA_TYPES = {
    IMAGE: 'image',
    POWESTATS: 'powerstats',
    BIOGRAPHY: 'biography',
};

app.use(cors());

const getDataForHero = (dataType, heroId) => {
    return axios.get(`${API_ENDPOINT}/${heroId}/${dataType}`);
};

const getImage = (heroId) => {
    return axios.get(`${API_ENDPOINT}/${heroId}/${DATA_TYPES.IMAGE}`);
};

const getPowerstats = (heroId) => {
    return getDataForHero(DATA_TYPES.POWESTATS, heroId);
};

const getBiography = (heroId) => {
    return getDataForHero(DATA_TYPES.BIOGRAPHY, heroId);
};

app.get('/superhero/all', (req, res) => {
    let imageCalls = [];
    for(const id in MARVEL_IDS) {
        imageCalls.push(getImage(MARVEL_IDS[id]));
    }
    axios.all(imageCalls)
        .then(axios.spread((...responses) => {
            let superheroes = [];
            responses.forEach((singleResponse) => {
                if(singleResponse.data.response === SUCCESS) {
                    delete singleResponse.data.response;
                    superheroes.push(singleResponse.data);
                }
            });
            res.json({ superheroes: superheroes });
        })).catch(errors => {
        });
});

app.get('/superhero/:id', (req, res) => {
    const heroId = req.params.id;
    axios.all([getPowerstats(heroId), getBiography(heroId)])
        .then(axios.spread((...responses) => {
            let heroDetails = {
                id: heroId,
            };
            responses.forEach((singleResponse) => {
                if(singleResponse.data.response === SUCCESS) {
                    delete singleResponse.data.response;
                    delete singleResponse.data.id;
                    let pathArr = singleResponse.request.path.split("/");
                    heroDetails[pathArr[pathArr.length - 1]] = singleResponse.data;
                }
            });
            res.json(heroDetails);
        })).catch(errors => {
        });
});

app.listen(PORT, () => {
    console.log(`Marvel's server listening on port ${PORT}`);
})