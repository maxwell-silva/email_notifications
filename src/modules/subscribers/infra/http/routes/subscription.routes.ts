import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import LeaveSubscriptionController from '../controllers/LeaveSubscriptionController';
import SubscriptionsController from '../controllers/SubscriptionsController';
import CSVImportController from '../controllers/CSVImportController';

import uploadConfig from '../../../../../config/upload';

const subscriptionRouter = Router();
const leaveSubscriptionController = new LeaveSubscriptionController();
const subscriptionsController = new SubscriptionsController();
const csvImporterController = new CSVImportController();

const upload = multer(uploadConfig.multer);

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
subscriptionRouter.get(
  '/leave',
  celebrate({
    [Segments.QUERY]: {
      dist: Joi.string().uuid().required(),
      id: Joi.string().uuid().required(),
    },
  }),
  leaveSubscriptionController.create,
);

subscriptionRouter.use(ensureAuthenticated);
subscriptionRouter.post(
  '/import',
  upload.single('file'),
  csvImporterController.create,
);

export default subscriptionRouter;
