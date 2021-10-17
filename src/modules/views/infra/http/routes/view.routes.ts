import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import ImportViewController from '../controllers/ImportViewController';

import uploadConfig from '../../../../../config/upload';

const viewRouter = Router();
const importViewController = new ImportViewController();

const upload = multer(uploadConfig.multer);

viewRouter.use(ensureAuthenticated);

viewRouter.post('/import', upload.single('file'), importViewController.create);
viewRouter.get('/show', importViewController.show);
viewRouter.get('/show/:id', importViewController.get);
export default viewRouter;
