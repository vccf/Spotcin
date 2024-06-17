import OtherRepository from '../repositories/other.repository';
import TestRepository from '../repositories/test.repository';
import TestService from '../services/test.service';
import Injector from './injector';
import UserRepository from '../repositories/user.repository';
import UserService from '../services/user.service';

export const di = new Injector();

// Test
di.registerRepository(TestRepository, new TestRepository());
di.registerRepository(OtherRepository, new OtherRepository());
di.registerRepository(UserRepository, new UserRepository());
di.registerService(
  TestService,
  new TestService(
    di.getRepository(TestRepository),
    di.getRepository(OtherRepository)
  ));
di.registerService(
  UserService,
  new UserService(
    di.getRepository(UserRepository)
  ));
