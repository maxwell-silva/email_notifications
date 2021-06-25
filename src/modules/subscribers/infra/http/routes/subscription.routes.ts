import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import LeaveSubscriptionController from '../controllers/LeaveSubscriptionController';
import SubscriptionsController from '../controllers/SubscriptionsController';

const subscriptionRouter = Router();
const leaveSubscriptionController = new LeaveSubscriptionController();
const subscriptionsController = new SubscriptionsController();
subscriptionRouter.use(ensureAuthenticated);

subscriptionRouter.post(
  '/join',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      lastName: Joi.string(),
      email: Joi.string().email().required(),
    },
  }),
  subscriptionsController.create,
);
subscriptionRouter.post(
  '/import',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  subscriptionsController.create,
);
subscriptionRouter.post(
  '/leave',
  celebrate({
    [Segments.BODY]: {
      distribution_id: Joi.string().uuid().required(),
      subscriber_id: Joi.string().uuid().required(),
    },
  }),
  leaveSubscriptionController.create,
);

export default subscriptionRouter;
