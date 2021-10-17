import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import notificationRouter from '@modules/subscribers/infra/http/routes/notification.routes';
import distributionRouter from '@modules/subscribers/infra/http/routes/distribution.routes';
import subscriptionRouter from '@modules/subscribers/infra/http/routes/subscription.routes';
import group from '@modules/groups/infra/http/routes/group.routes';
import viewsRouter from '@modules/views/infra/http/routes/view.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/notification', notificationRouter);
routes.use('/distribution', distributionRouter);
routes.use('/subscription', subscriptionRouter);
routes.use('/group', group);
routes.use('/views', viewsRouter);

export default routes;
