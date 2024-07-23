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

        when(/^uma requisição (.*) for enviada para "(.*)"$/, async (POST, url) => {
            mockRecommendationEntity.recommendationHistory.push(
                { id: 1, name: 'Ride', artist: 'Lana Del Rey'}, 
                { id: 2, name: 'Age of Love', artist: 'Charlotte de Witte'}, 
                { id: 3, name: 'Legacy', artist: 'Sara Landry'}, 
                { id: 4, name: 'Dori Me', artist: 'Deborah de Luca'}, 
                { id: 5, name: 'Metal Heart', artist: 'Cat Powder'}
            );
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
            response = await request.get('/recommendations/generate').query({ userId: mockRecommendationEntity.userId });
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(200);
        });

        and (/^o JSON da resposta deve ser uma playlist de músicas$/, () => {
            expect(response.body).toBeDefined();
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('artist');
        });

        /*and(/^o sistema gera uma lista de recomendações com (\d+) músicas que podem ser visualizadas pelo usuário$/, async (count) => {
            const playlist = response.body;
            expect(playlist).toHaveLength(parseInt(count, 5)); // Initially it recommends 5 songs
        });*/
        //and (/^as músicas 'Ride-Lana Del Rey', 'Age of Love-Charlotte de Witte', 'Legacy-Sara Landry', 'Dori Me-Deborah de Luca', 'Metal Heart-Cat Powder' estão na playlist$/, () => {
        and(/^as músicas "(.*)", "(.*)", "(.*)", "(.*)", "(.*)" estão na playlist$/, (arg0, arg1, arg2, arg3, arg4) => {
            const playlist = response.body;
            expect(playlist).toContainEqual({ name: 'Ride', artist: 'Lana Del Rey' });
            expect(playlist).toContainEqual({ name: 'Age of Love', artist: 'Charlotte de Witte' });
            expect(playlist).toContainEqual({ name: 'Legacy', artist: 'Sara Landry' });
            expect(playlist).toContainEqual({ name: 'Dori Me', artist: 'Deborah de Luca' });
            expect(playlist).toContainEqual({ name: 'Metal Heart', artist: 'Cat Powder' });
        });
    });

//And o JSON da resposta deve ser uma playlist de músicas
//And as músicas “Age of Love-Charlotte de Witte”, “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Powd﻿er” estão na playlist


    test('Excluir música(s) das recomendadas', ({ given, when, then, and }) => {
        given(/^A usuária "(.*)" está no sistema$/, async (username) => {
            mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                listenedSongs:[],
                recommendedSongs: [
                    { id: 1, name: 'Ride', artist: 'Lana Del Rey'}, 
                    { id: 2, name: 'Age of Love', artist: 'Charlotte de Witte'}, 
                    { id: 3, name: 'Legacy', artist: 'Sara Landry'}, 
                    { id: 4, name: 'Dori Me', artist: 'Deborah de Luca'}, 
                    { id: 5, name: 'Metal Heart', artist: 'Cat Powder'}
                ],
                recommendationHistory: [],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        and(/^a playlist "Músicas recomendadas" associada a usuária "(.*)" tem as músicas$/, async (username, recommendedSongs) => {
            mockRecommendationEntity.recommendedSongs = [
                { id: 1, name: 'Ride', artist: 'Lana Del Rey'}, 
                { id: 2, name: 'Age of Love', artist: 'Charlotte de Witte'}, 
                { id: 3, name: 'Legacy', artist: 'Sara Landry'}, 
                { id: 4, name: 'Dori Me', artist: 'Deborah de Luca'}, 
                { id: 5, name: 'Metal Heart', artist: 'Cat Powder'}
            ];
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });
    
        when(/^uma requisição "DELETE" for enviada para "(.*)" com o corpo da requisição sendo um JSON com a música "(.*)"$/, async (url, songToRemove) => {
            response = await request.delete(`/recommendations/${mockRecommendationEntity.userId}/delete/${songToRemove}`);
        });
    
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(200);
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
                listenedSongs: [],
                recommendedSongs: [
                    { id: 1, name: 'Ride', artist: 'Lana Del Rey'}, 
                    { id: 2, name: 'Age of Love', artist: 'Charlotte de Witte'}, 
                    { id: 3, name: 'Legacy', artist: 'Sara Landry'}, 
                    { id: 4, name: 'Dori Me', artist: 'Deborah de Luca'}, 
                    { id: 5, name: 'Metal Heart', artist: 'Cat Powder'}],
                recommendationHistory: [],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        and(/^a playlist "Músicas recomendadas" associada a usuária "(.*)" tem as músicas$/, async (username, recommendedSongs) => {
            mockRecommendationEntity.recommendedSongs = [
                { id: 1, name: 'Ride', artist: 'Lana Del Rey'}, 
                { id: 2, name: 'Age of Love', artist: 'Charlotte de Witte'}, 
                { id: 3, name: 'Legacy', artist: 'Sara Landry'}, 
                { id: 4, name: 'Dori Me', artist: 'Deborah de Luca'}, 
                { id: 5, name: 'Metal Heart', artist: 'Cat Powder'}];
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        when(/^seleciono a opção "Ver mais"$/, async () => {
            const newSongs = [
                { id: 6, name: 'Rigid (Kobosil 44 Rush Mix)', artist: 'Rosa Anschütz'}, 
                { id: 7, name: 'Hypnotized (Joyhauser Mix)', artist: 'Amelie Lens'},
                { id: 8, name: 'Shame', artist: 'Low'},
                { id: 9, name: 'Schwarze Schatten', artist: 'Schepperlotte'},
                { id: 10, name: 'City Looks Pretty', artist: 'Courtney Barnett'}
            ];
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
                listenedSongs: [],
                recommendedSongs: [],
                recommendationHistory: [],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        and(/^a playlist "(.*)" associada a usuária "(.*)" está vazia$/, async (listenedSongs, username) => {
            // No history or recommendations set up
            mockRecommendationEntity.listenedSongs = [];
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        when(/^uma requisição "POST" for enviada para "(.*)"$/, async (url) => {
            response = await request.get('/recommendations/generate').query({ userId: mockRecommendationEntity.userId });
        });

        then (/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(400);
        });


        and (/^o sistema mostra uma mensagem de erro "(.*)"$/, async (errorMessage) => {
            expect(response.body.message).toBe(errorMessage);
        });
    });

    test('Ver histórico de recomendações', ({ given, when, then, and }) => {
        given(/^A usuária "(.*)" está no sistema$/, async (username) => {
            mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                recommendedSongs: [],
                recommendationHistory: [
                    { id: 1, name: 'Ride', artist: 'Lana Del Rey'}, 
                    { id: 2, name: 'Age of Love', artist: 'Charlotte de Witte'}, 
                    { id: 3, name: 'Legacy', artist: 'Sara Landry'}, 
                    { id: 4, name: 'Dori Me', artist: 'Deborah de Luca'}, 
                    { id: 5, name: 'Metal Heart', artist: 'Cat Powder'}],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        and(/^as músicas "(.*)" foram previamente recomendadas$/, async (recommendedSongs) => {
            mockRecommendationEntity.recommendationHistory = recommendedSongs.split(', ');
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
        });

        when(/^uma requisição "GET" for enviada para$/, async (url) => {
            response = await request.get(`/recommendations/${mockRecommendationEntity.userId}/history`);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(200);
        });

        and (/^o JSON da resposta deve ser uma playlist de músicas$/, () => {
            expect(response.body).toBeDefined();
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('artist');
            expect(response.body[0]).toHaveProperty('genre');
            expect(response.body[0]).toHaveProperty('tags');
        });

        then(/^o JSON da resposta deve ser uma playlist de músicas$/, () => {
            expect(response.body).toBeDefined();
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(5); // Check if the playlist has 5 songs

            const expectedSongs = ['Song1', 'Song2', 'Song3', 'Song4', 'Song5'];
            for (const song of expectedSongs) {
                expect(response.body).toContain(song); // Check if each song is in the playlist
            }
        });

        //And as músicas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, 
//“Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Pow﻿der” estão na playlist



        then(/^o sistema mostra o histórico de recomendações: (.*)$/, async (recommendedSongs) => {
            const historyPlaylist = response.body;
            expect(historyPlaylist).toBeDefined();
            expect(historyPlaylist.songs).toEqual(recommendedSongs.split(', '));
        });
    });
});




