import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RecommendationRepository from '../../src/repositories/recommendation.repository';
import RecommendationEntity from '../../src/entities/recommendation.entity';

const feature = loadFeature('tests/features/recommendation.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    let mockRecommendationRepository: RecommendationRepository
    let response: supertest.Response;
    let mockRecommendationEntity: RecommendationEntity;
  
    beforeEach(() => {
      mockRecommendationRepository=di.getRepository<RecommendationRepository>((RecommendationRepository))
    });

    test('Gerar lista de recomendações', ({ given, when, then }) => {
        given(/^A usuária "(.*)" está no sistema$/, async (username) => {
            mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                recommendedSongs: ['Ride-Lana Del Rey', 
                    'Age of Love-Charlotte de Witte',
                    'Legacy-Sara Landry',
                    'Dori Me-Deborah de Luca',
                    'Metal Heart-Cat Powder'],
                recommendationHistory: [],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });
    
        when(/^espero que o sistema gere uma lista de recomendações com (\d+) músicas$/, async (count) => {
            response = await request.get('/recommendations/generate').query({ userId: mockRecommendationEntity.userId });
        });
    
        then(/^o sistema analisa os dados do perfil do usuário e histórico de músicas ouvidas$/, async () => {
            expect(response.status).toBe(200);
        });
    
        then(/^o sistema gera uma lista de recomendações com (\d+) músicas que podem ser visualizadas pelo usuário$/, async (count) => {
            const playlist = response.body;
            expect(playlist).toHaveLength(parseInt(count, 5)); //initially it recommends 5 songs
        });
    });

    test('Excluir música(s) das recomendadas', ({ given, when, then }) => {
        given(/^A usuária "(.*)" está no sistema$/, async (username) => {
            mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                recommendedSongs: ['Ride-Lana Del Rey', 
                    'Age of Love-Charlotte de Witte',
                    'Legacy-Sara Landry',
                    'Dori Me-Deborah de Luca',
                    'Metal Heart-Cat Powder'],
                recommendationHistory: [],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });
    
        when(/^seleciono a música "(.*)" e a excluo da lista de recomendações$/, async (songToRemove) => {
            response = await request.delete(`/recommendations/${mockRecommendationEntity.userId}/delete/${songToRemove}`);
        });
    
        then(/^a lista de recomendações está sem a música "(.*)" e com as músicas (.*)$/, async (removedSong, remainingSongs) => {
            const updatedPlaylist = await mockRecommendationRepository.getRecommendationByUserId(mockRecommendationEntity.userId);
            expect(updatedPlaylist).toBeDefined();
            expect(updatedPlaylist!.recommendedSongs).not.toContain(removedSong);
            //expect(updatedPlaylist).toHaveLength(parseInt(count, 4));
        });
    });

    test('Ver mais recomendações', ({ given, when, then }) => {
        given(/^A usuária "(.*)" está no sistema$/, async (username) => {
            mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                recommendedSongs: ['Ride-Lana Del Rey', 
                    'Age of Love-Charlotte de Witte',
                    'Legacy-Sara Landry',
                    'Dori Me-Deborah de Luca',
                    'Metal Heart-Cat Powder'],
                recommendationHistory: [],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });
    
        when(/^seleciono a opção "Ver mais"$/, async () => {
            response = await request.put(`/recommendations/${mockRecommendationEntity.userId}/more`);
        });
    
        then(/^o sistema gera mais (\d+) recomendações e as adiciona a lista de recomendações$/, async (newCount) => {
            const updatedPlaylist = await mockRecommendationRepository.getRecommendationByUserId(mockRecommendationEntity.userId);
            expect(updatedPlaylist).toBeDefined();
            expect(updatedPlaylist!.recommendedSongs).toHaveLength(10); // initially 5 recommendations, then more 5
        });
    
        then(/^agora a lista de recomendações do sistema tem (\d+) músicas$/, async (totalCount) => {
            const updatedPlaylist = await mockRecommendationRepository.getRecommendationByUserId(mockRecommendationEntity.userId);
            expect(updatedPlaylist).toBeDefined();
            expect(updatedPlaylist!.recommendedSongs).toHaveLength(parseInt(totalCount, 10));
        });
    });

    test('Não há recomendações suficientes', ({ given, when, then }) => {
        given(/^A usuária "(.*)" está no sistema$/, async (username) => {
            // Assuming setting up a user with insufficient history
            // Mock this in a real test scenario
            mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                recommendedSongs: [],
                recommendationHistory: [],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });
    
        when(/^espero que o sistema gere uma lista de recomendações com (\d+) músicas$/, async (count) => {
            response = await request.get('/recommendations/generate').query({ userId: mockRecommendationEntity.userId });
        });
    
        then(/^o sistema mostra uma mensagem de erro "(.*)"$/, async (errorMessage) => {
            expect(response.status).toBe(400); //bad request error
            expect(response.body.message).toBe(errorMessage);
        });
    });

    test('Ver histórico de recomendações', ({ given, when, then }) => {
        given(/^A usuária "(.*)" está no sistema$/, async (username) => {
            mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                recommendedSongs: [],
                recommendationHistory: ['Ride-Lana Del Rey', 
                    'Age of Love-Charlotte de Witte',
                    'Legacy-Sara Landry',
                    'Dori Me-Deborah de Luca',
                    'Metal Heart-Cat Powder'],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });
    
        when(/^seleciono a opção "Histórico de recomendações"$/, async () => {
            response = await request.get(`/recommendations/${mockRecommendationEntity.userId}/history`);
        });
    
        then(/^o sistema mostra o histórico de recomendações: (.*)$/, async (recommendedSongs) => {
            const historyPlaylist = response.body;
            expect(historyPlaylist).toBeDefined();
            expect(historyPlaylist.songs).toEqual(recommendedSongs.split(', ')); 
        });
    });     
});
