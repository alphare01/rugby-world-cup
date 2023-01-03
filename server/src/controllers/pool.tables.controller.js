const { getAllPools } = require('../models/pools.model');

async function httpGetAllPools(req, res) {
    return res.status(200).json(await getAllPools());
};

module.exports = {
    httpGetAllPools,
};