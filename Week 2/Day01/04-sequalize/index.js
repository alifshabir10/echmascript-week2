import 'dotenv/config';
import cors from "cors";
import express from "express";

import models, { sequelize } from './models/index.model';
import routes from './routes/index.routes';

const port = process.env.PORT || 1337

// let's create express application & store in app
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models
  };
  next();
});

// Routes
app.use('/regions', routes.regions);


// Start

const dropDatabaseSync = false;

sequelize.sync({ force: dropDatabaseSync }).then(async () => {
  if (dropDatabaseSync) {
    console.log("Do Nothing")
  }

  app.listen(process.env.PORT, () =>
    console.log(`Server is listening on port ${process.env.PORT}!`),
  );
});