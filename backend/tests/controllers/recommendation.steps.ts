import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RecommendationRepository from '../../src/repositories/recommendation.repository';
import RecommendationEntity from '../../src/entities/recommendation.entity';

const feature = loadFeature('tests/features/recommendation.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    let mockRecommendationRepository: RecommendationRepository;
    let response: supertest.Response;
    let mockRecommendationEntity: RecommendationEntity;

    beforeEach(() => {
        mockRecommendationRepository = di.getRepository<RecommendationRepository>(RecommendationRepository);
    });

    test('Gerar lista de recomendações', ({ given, when, then, and }) => {
        given(/^A usuária "(.*)" está no sistema$/, async (username) => {
            mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                recommendedSongs: [],
                recommendationHistory: [],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        and(/^o sistema possui acesso aos dados do perfil do usuário, histórico de reprodução e interações anteriores$/, async () => {
            mockRecommendationEntity.recommendationHistory.push('Ride-Lana Del Rey', 'Age of Love-Charlotte de Witte', 'Legacy-Sara Landry', 'Dori Me-Deborah de Luca', 'Metal Heart-Cat Powder');
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        when(/^espero que o sistema gere uma lista de recomendações com (\d+) músicas$/, async (count) => {
            response = await request.get('/recommendations/generate').query({ userId: mockRecommendationEntity.userId });
        });

        then(/^o sistema analisa os dados do perfil do usuário e histórico de músicas ouvidas$/, async () => {
            expect(response.status).toBe(200);
        });

        and(/^o sistema gera uma lista de recomendações com (\d+) músicas que podem ser visualizadas pelo usuário$/, async (count) => {
            const playlist = response.body;
            expect(playlist).toHaveLength(parseInt(count, 5)); // Initially it recommends 5 songs
        });
    });

    test('Excluir música(s) das recomendadas', ({ given, when, then, and }) => {
        given(/^A usuária "(.*)" está no sistema$/, async (username) => {
            mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                recommendedSongs: ['Ride-Lana Del Rey', 'Age of Love-Charlotte de Witte', 'Legacy-Sara Landry', 'Dori Me-Deborah de Luca', 'Metal Heart-Cat Powder'],
                recommendationHistory: [],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        and(/^a playlist "Músicas recomendadas" associada a usuária "(.*)" tem as músicas$/, async (username, recommendedSongs) => {
            mockRecommendationEntity.recommendedSongs = ['Ride-Lana Del Rey', 'Age of Love-Charlotte de Witte', 'Legacy-Sara Landry', 'Dori Me-Deborah de Luca', 'Metal Heart-Cat Powder'];
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        when(/^seleciono a música "(.*)" e a excluo da lista de recomendações$/, async (songToRemove) => {
            response = await request.delete(`/recommendations/${mockRecommendationEntity.userId}/delete/${songToRemove}`);
        });

        then(/^a lista de recomendações está sem a música "(.*)" e com as músicas (.*)$/, async (removedSong, remainingSongs) => {
            const updatedPlaylist = await mockRecommendationRepository.getRecommendationByUserId(mockRecommendationEntity.userId);
            expect(updatedPlaylist).toBeDefined();
            expect(updatedPlaylist!.recommendedSongs).not.toContain(removedSong);
            expect(updatedPlaylist!.recommendedSongs).toEqual(remainingSongs.split(', '));
        });
    });

    test('Ver mais recomendações', ({ given, when, then, and }) => {
        given(/^A usuária "(.*)" está no sistema$/, async (username) => {
            mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                recommendedSongs: ['Ride-Lana Del Rey', 'Age of Love-Charlotte de Witte', 'Legacy-Sara Landry', 'Dori Me-Deborah de Luca', 'Metal Heart-Cat Powder'],
                recommendationHistory: [],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        and(/^a playlist "Músicas recomendadas" associada a usuária "(.*)" tem as músicas$/, async (username, recommendedSongs) => {
            mockRecommendationEntity.recommendedSongs = ['Ride-Lana Del Rey', 'Age of Love-Charlotte de Witte', 'Legacy-Sara Landry', 'Dori Me-Deborah de Luca', 'Metal Heart-Cat Powder'];
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        when(/^seleciono a opção "Ver mais"$/, async () => {
            const newSongs = ['Rigid (Kobosil 44 Rush Mix)-Rosa Anschütz', 'Hypnotized (Joyhauser Mix)-Amelie Lens', 'Shame-Low', 'Schwarze Schatten-Schepperlotte', 'City Looks Pretty-Courtney Barnett'];
            mockRecommendationEntity.recommendedSongs.push(...newSongs);
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
    
            response = await request.put(`/recommendations/${mockRecommendationEntity.userId}/more`);
        });
    

        then(/^o sistema gera mais (\d+) recomendações e as adiciona a lista de recomendações$/, async (newCount) => {
            const updatedPlaylist = await mockRecommendationRepository.getRecommendationByUserId(mockRecommendationEntity.userId);
            expect(updatedPlaylist).toBeDefined();
            expect(updatedPlaylist!.recommendedSongs).toHaveLength(10); // Initially 5 recommendations, then more 5
        });

        and(/^agora a lista de recomendações do sistema tem (\d+) músicas$/, async (totalCount) => {
            const updatedPlaylist = await mockRecommendationRepository.getRecommendationByUserId(mockRecommendationEntity.userId);
            expect(updatedPlaylist).toBeDefined();
            expect(updatedPlaylist!.recommendedSongs).toHaveLength(parseInt(totalCount, 10));
        });
    });

    test('Não há recomendações suficientes', ({ given, when, then, and }) => {
        given(/^A usuária "(.*)" está no sistema$/, async (username) => {
            mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                recommendedSongs: [],
                recommendationHistory: [],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        and(/^o sistema não tem informações sobre as músicas escutadas$/, async () => {
            // No history or recommendations set up
            mockRecommendationEntity.recommendationHistory = [];
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        when(/^espero que o sistema gere uma lista de recomendações com (\d+) músicas$/, async (count) => {
            response = await request.get('/recommendations/generate').query({ userId: mockRecommendationEntity.userId });
        });

        then(/^o sistema mostra uma mensagem de erro "(.*)"$/, async (errorMessage) => {
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(errorMessage);
        });
    });

    test('Ver histórico de recomendações', ({ given, when, then, and }) => {
        given(/^A usuária "(.*)" está no sistema$/, async (username) => {
            mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                recommendedSongs: [],
                recommendationHistory: ['Ride-Lana Del Rey', 'Age of Love-Charlotte de Witte', 'Legacy-Sara Landry', 'Dori Me-Deborah de Luca', 'Metal Heart-Cat Powder'],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        and(/^as músicas "(.*)" foram previamente recomendadas$/, async (recommendedSongs) => {
            mockRecommendationEntity.recommendationHistory = recommendedSongs.split(', ');
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
