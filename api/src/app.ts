import express from 'express';
import config from './app/config/dotenv';
import { errorHandler } from './app/utils/ErrorHandler';
import 'express-async-errors';

import routes from './app/routes/routes';

const app = express();
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(config.appPort, () => console.log(`Server started at http://localhost:${config.appPort}`));
