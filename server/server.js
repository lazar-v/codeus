const express = require('express');
const apiRouter = require('./routes')
const app = express();
const sequelize = require('./db');
const models = require('./models');
const compression = require('compression');
const helmet = require('helmet');

app.use(helmet());
app.use(compression());
app.use('/api/', apiRouter);

sequelize.authenticate()
    .then( () => console.log('Database connected..'))
    .catch( err => console.log(`Error: ${err}`));

sequelize.sync()
    .then( () =>
        app.listen(process.env.PORT || 3000, () =>
            console.log(`Server is running on port ${process.env.PORT || 3000}`)));

