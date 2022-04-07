import { Router } from 'express';

import calculate from './controllers/math';

const routes = new Router();

routes.post('/calculate', calculate);

export default routes;
