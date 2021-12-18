import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) =>
  res.status(200).json({
    message: 'You will get the drawing info here',
  }),
);

router.all('*', (req, res, next) =>
  res.status(404).json({
    message: 'Didn\'t create the route yet',
  }),
);

export default router;