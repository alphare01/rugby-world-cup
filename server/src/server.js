//-----------REQUIRE-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const {loadPoolMatchesData} = require('./models/pool.matches.model');
const {loadPoolTablesData} = require('./models/pool.tables.model');

//-----------SERVER SETUP------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const PORT = 8000;
const server = http.createServer(app);

//-----------MONGO DB SETUP----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const MONGO_URL = 'mongodb+srv://alphare:Wxz9U3us0qp5n62e@rwccluster.btthaa7.mongodb.net/?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
    console.log('Connection to MongoDB ready');
});
mongoose.connection.on('error', (err) => {
    console.error(err);
});

//-----------FUNCTION----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPoolMatchesData();
    await loadPoolTablesData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
};

startServer();

//----------TEST---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------