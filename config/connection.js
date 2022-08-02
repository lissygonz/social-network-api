const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://locahlhost/social_network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

module.exports = mongoose,this.connection