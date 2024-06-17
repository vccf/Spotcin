import OtherRepository from '../repositories/other.repository';
import TestRepository from '../repositories/test.repository';
import TestService from '../services/test.service';

import PlaylistRepository from '../repositories/playlist.repository';
import PlaylistService from '../services/playlist.service';

import Injector from './injector';

export const di = new Injector();

// Test
di.registerRepository(TestRepository, new TestRepository());
di.registerRepository(OtherRepository, new OtherRepository());
di.registerService(
  TestService,
  new TestService(
    di.getRepository(TestRepository),
    di.getRepository(OtherRepository)
  )
);

// Playlist
di.registerRepository(PlaylistRepository, new PlaylistRepository());
di.registerService(PlaylistService, new PlaylistService(di.getRepository(PlaylistRepository)));
