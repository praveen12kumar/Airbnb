import express from 'express';

import { pingController } from '../../controllers/ping.controller';
import { validateRequestBody } from '../../validators';
import { pingSchema } from '../../validators/ping.schema';

const pingRouter = express.Router();
pingRouter.get('/', validateRequestBody(pingSchema), pingController);
export default pingRouter;
