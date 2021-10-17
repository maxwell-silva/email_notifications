import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import LeaveSubscriptionController from '../controllers/LeaveSubscriptionController';
import LeaveSubscriptionByEmailController from '../controllers/LeaveSubscriptionByEmailController';
import LeaveSubscriptionByEmailsController from '../controllers/LeaveSubscriptionByEmailsController';
import SubscriptionsController from '../controllers/SubscriptionsController';
import CSVImportController from '../controllers/CSVImportController';

import uploadConfig from '../../../../../config/upload';

const subscriptionRouter = Router();
const leaveSubscriptionController = new LeaveSubscriptionController();
const leaveSubscriptionByEmailController = new LeaveSubscriptionByEmailController();
const leaveSubscriptionByEmailsController = new LeaveSubscriptionByEmailsController();
const subscriptionsController = new SubscriptionsController();
const csvImporterController = new CSVImportController();

const upload = multer(uploadConfig.multer);

subscriptionRouter.get(
  '/leave',
  celebrate({
    [Segments.QUERY]: {
      dist: Joi.string().uuid(),
      id: Joi.string().uuid().required(),
    },
  }),
  leaveSubscriptionController.create,
);

subscriptionRouter.use(ensureAuthenticated);
subscriptionRouter.post(
  '/join',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      lastName: Joi.string(),
      email: Joi.string().email().required(),
      groupId: Joi.string().required(),
    },
  }),
  subscriptionsController.create,
);
subscriptionRouter.get(
  '/leave/:email',
  celebrate({
    [Segments.PARAMS]: {
      email: Joi.string().required(),
    },
  }),
  leaveSubscriptionByEmailController.create,
);
subscriptionRouter.post(
  '/leave',
  celebrate({
    [Segments.BODY]: {
      emails: Joi.array().items(Joi.string()).required(),
    },
  }),
  leaveSubscriptionByEmailsController.create,
);
subscriptionRouter.post(
  '/import',
  upload.single('file'),
  csvImporterController.create,
);
subscriptionRouter.post('/show', subscriptionsController.show);
subscriptionRouter.post('/clean', subscriptionsController.clean);
export default subscriptionRouter;
