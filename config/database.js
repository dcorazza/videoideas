if (process.env.NODE_ENV == 'production') {
    module.exports = { mongoURI: 'mongodb://dcorazza:teste123@ds247852.mlab.com:47852/vidjot-prod' }
} else {
    module.exports = { mongoURI: 'mongodb://localhost/vidjot-dev' }
}