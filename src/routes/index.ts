import { Router } from 'express';

import usersRouter from './users.routes';
import sessionRouter from './sessions.routes';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/sessions', sessionRouter);
routes.use('/users', usersRouter);
routes.use('/appointments', appointmentsRouter);

export default routes;
