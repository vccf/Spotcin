import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';

import PlaylistController from '../controllers/playlist.controller';
import PlaylistService from '../services/playlist.service';

import RecommendationController from '../controllers/recommendation.controller';
import RecommendationService from '../services/recommendation.service';


const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );

  app.use(
    prefix,
    new PlaylistController(router, di.getService(PlaylistService)).router
  );

  app.use(
    prefix,
    new RecommendationController(router, di.getService(RecommendationService)).router
  );

};
