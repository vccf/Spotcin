import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RecommendationRepository from '../../src/repositories/recommendation.repository';

const feature = loadFeature('tests/features/recommendations_user_service.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  // mocking the repository
  let mockTestRepository: RecommendationRepository;
  let response: supertest.Response;

  beforeEach(() => {
    mockTestRepository = di.getRepository<RecommendationRepository>(RecommendationRepository);
  });

  test('Gerar lista de recomendações (serviço)', ({ given, when, then, and }) => {
    given(/^A usuária "(.*)" está no sistema $/, async (userId) => {
      // Check if the test does not exist in the repository and delete it if it exists
      const existingTest = await mockTestRepository.getTest(testId);
      if (existingTest) {
        await mockTestRepository.deleteTest(testId);
      }
    });

    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com o nome "(.*)"$/,
      async (url, testName) => {
        response = await request.post(url).send({
          name: testName,
        });
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter o nome "(.*)"$/, (testName) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({
            name: testName,
          })
        );
      }
    );
    
  });

});
