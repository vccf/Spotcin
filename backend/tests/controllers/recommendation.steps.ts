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
            /*mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                listenedSongs : [],
                recommendedSongs: [],
                recommendationHistory: [],
            });
            await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);*/
            await mockRecommendationRepository.createRec(username);
        });

        when(/^uma requisição (.*) for enviada para "(.*)"$/, async (POST, url) => {
            const newRecs =[
            //mockRecommendationEntity.recommendedSongs.push(
                { id: '1', idSong: 1, name: 'Ride', artist: 'Lana Del Rey', genre: "Art pop", tags: ["melancholic", "female", "longing"]}, 
                { id: '2', idSong: 2, name: 'Age of Love', artist: 'Charlotte de Witte', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '3', idSong: 3, name: 'Legacy', artist: 'Sara Landry', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '4', idSong: 4, name: 'Dori Me', artist: 'Deborah de Luca', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '5', idSong: 5, name: 'Metal Heart', artist: 'Cat Power', genre: "Slowcore", tags: ["female", "melancholic", "dark", "hypnotic"]}
            ];
            //);
            //await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
            //response = await request.get('/recommendations/generate').query({ userId: mockRecommendationEntity.userId });
            await mockRecommendationRepository.updateRec(mockRecommendationEntity, newRecs);
            await mockRecommendationRepository.getMoreRecs();
            response = await request.post('/recommendations/playlist');
            console.log(response.body);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode)); //200
        });

        and (/^o JSON da resposta deve ser uma playlist de músicas$/, () => {
            expect(response.body).toBeDefined();
            expect(Array.isArray(response.body)).toBe(true);
            //expect(response.body.length).toBeGreaterThan(0);
            expect(response.body.length).toBe(5);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('idSong');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('artist');
            expect(response.body[0]).toHaveProperty('genre');
            expect(response.body[0]).toHaveProperty('tags');
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
            console.log(response.body);
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
                    { id: '1', idSong: 1, name: 'Ride', artist: 'Lana Del Rey', genre: "Art pop", tags: ["melancholic", "female", "longing"]}, 
                    { id: '2', idSong: 2, name: 'Age of Love', artist: 'Charlotte de Witte', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '3', idSong: 3, name: 'Legacy', artist: 'Sara Landry', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '4', idSong: 4, name: 'Dori Me', artist: 'Deborah de Luca', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '5', idSong: 5, name: 'Metal Heart', artist: 'Cat Power', genre: "Slowcore", tags: ["female", "melancholic", "dark", "hypnotic"]}
                ],
                recommendationHistory: [
                    { id: '1', idSong: 1, name: 'Ride', artist: 'Lana Del Rey', genre: "Art pop", tags: ["melancholic", "female", "longing"]}, 
                    { id: '2', idSong: 2, name: 'Age of Love', artist: 'Charlotte de Witte', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '3', idSong: 3, name: 'Legacy', artist: 'Sara Landry', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '4', idSong: 4, name: 'Dori Me', artist: 'Deborah de Luca', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '5', idSong: 5, name: 'Metal Heart', artist: 'Cat Power', genre: "Slowcore", tags: ["female", "melancholic", "dark", "hypnotic"]}
                ],
            });
            //await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
            await mockRecommendationRepository.createRec(username);
            await mockRecommendationRepository.updateRec(mockRecommendationEntity, mockRecommendationEntity.recommendedSongs);
        });

        and(/^a playlist "(.*)" associada a usuária "(.*)" tem as músicas "(.*)", "(.*)", "(.*)", "(.*)", "(.*)"$/, 
            async (recommendedSongs, username, song1, song2, song3, song4, song5) => {
            mockRecommendationEntity.recommendedSongs = [
                { id: '1', idSong: 1, name: 'Ride', artist: 'Lana Del Rey', genre: "Art pop", tags: ["melancholic", "female", "longing"]}, 
                { id: '2', idSong: 2, name: 'Age of Love', artist: 'Charlotte de Witte', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '3', idSong: 3, name: 'Legacy', artist: 'Sara Landry', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '4', idSong: 4, name: 'Dori Me', artist: 'Deborah de Luca', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '5', idSong: 5, name: 'Metal Heart', artist: 'Cat Power', genre: "Slowcore", tags: ["female", "melancholic", "dark", "hypnotic"]}
            ];
            //await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
            await mockRecommendationRepository.updateRec(mockRecommendationEntity, mockRecommendationEntity.recommendedSongs);
        });
    
        when(/^uma requisição "(.*)" for enviada para "(.*)" com o corpo da requisição sendo um JSON com a música "(.*)"$/, 
            async (DELETE, url, songToRemove) => {
            //response = await request.delete(`/recommendations/${mockRecommendationEntity.userId}/delete/${songToRemove}`);
            response = await request.delete(`/recommendations/playlist/${songToRemove}`);
            console.log(response.body);
        });
    
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode)); //200
        });

        and(/^o JSON da resposta deve ser uma playlist de músicas$/, () => {
            expect(response.body).toBeDefined();
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(4); // Initially 5 recommendations, then 1 removed
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('idSong');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('artist');
            expect(response.body[0]).toHaveProperty('genre');
            expect(response.body[0]).toHaveProperty('tags');
        });

        and (/^a música "(.*)" não está na playlist e as músicas "(.*)", "(.*)", "(.*)", "(.*)" estão na playlist$/, 
            async (removedSong, remainingSongs) => { 
            //const updatedPlaylist = await mockRecommendationRepository.getRecommendationByUserId(mockRecommendationEntity.userId);
            const updatedPlaylist = await mockRecommendationRepository.deleteOneRec(removedSong);
            expect(updatedPlaylist).toBeDefined();
            expect(updatedPlaylist).toHaveLength(4); // Initially 5 recommendations, then 1 removed
            expect(updatedPlaylist).not.toContain(removedSong);
            expect(updatedPlaylist).toEqual(remainingSongs.split(', '));
            //expect(updatedPlaylist!.recommendedSongs).not.toContain(removedSong);
            //expect(updatedPlaylist!.recommendedSongs).toEqual(remainingSongs.split(', '));
        });
    });

    test('Ver mais recomendações', ({ given, when, then, and }) => {
        given(/^A usuária "(.*)" está no sistema$/, async (username) => {
            mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                listenedSongs: [],
                recommendedSongs: [
                    { id: '1', idSong: 1, name: 'Ride', artist: 'Lana Del Rey', genre: "Art pop", tags: ["melancholic", "female", "longing"]}, 
                    { id: '2', idSong: 2, name: 'Age of Love', artist: 'Charlotte de Witte', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '3', idSong: 3, name: 'Legacy', artist: 'Sara Landry', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '4', idSong: 4, name: 'Dori Me', artist: 'Deborah de Luca', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '5', idSong: 5, name: 'Metal Heart', artist: 'Cat Power', genre: "Slowcore", tags: ["female", "melancholic", "dark", "hypnotic"]}
                ],
                recommendationHistory: [
                    { id: '1', idSong: 1, name: 'Ride', artist: 'Lana Del Rey', genre: "Art pop", tags: ["melancholic", "female", "longing"]}, 
                    { id: '2', idSong: 2, name: 'Age of Love', artist: 'Charlotte de Witte', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '3', idSong: 3, name: 'Legacy', artist: 'Sara Landry', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '4', idSong: 4, name: 'Dori Me', artist: 'Deborah de Luca', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '5', idSong: 5, name: 'Metal Heart', artist: 'Cat Power', genre: "Slowcore", tags: ["female", "melancholic", "dark", "hypnotic"]}
                ],
            });
            //await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
            await mockRecommendationRepository.createRec(username);
            await mockRecommendationRepository.updateRec(mockRecommendationEntity, mockRecommendationEntity.recommendedSongs);
        });

        and(/^a playlist "(.*)" associada a usuária "(.*)" tem as músicas "(.*)", "(.*)", "(.*)", "(.*)", "(.*)"$/, 
            async (recommendedSongs, username, song1, song2, song3, song4, song5) => {
            mockRecommendationEntity.recommendedSongs = [
                { id: '1', idSong: 1, name: 'Ride', artist: 'Lana Del Rey', genre: "Art pop", tags: ["melancholic", "female", "longing"]}, 
                { id: '2', idSong: 2, name: 'Age of Love', artist: 'Charlotte de Witte', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '3', idSong: 3, name: 'Legacy', artist: 'Sara Landry', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '4', idSong: 4, name: 'Dori Me', artist: 'Deborah de Luca', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '5', idSong: 5, name: 'Metal Heart', artist: 'Cat Power', genre: "Slowcore", tags: ["female", "melancholic", "dark", "hypnotic"]}
            ];
            //await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
            await mockRecommendationRepository.updateRec(mockRecommendationEntity, mockRecommendationEntity.recommendedSongs);
        });

        when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async (POST, url) => {
            const newSongs = [
                { id: '6', idSong: 6, name: 'Rigid (Kobosil 44 Rush Mix)', artist: 'Rosa Anschütz', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '7', idSong: 7, name: 'Hypnotized (Joyhauser Mix)', artist: 'Amelie Lens', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]},
                { id: '8', idSong: 8, name: 'Shame', artist: 'Low', genre: "Slowcore", tags: ["female", "melancholic", "dark", "hypnotic"]},
                { id: '9', idSong: 9, name: 'Schwarze Schatten', artist: 'Schepperlotte', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]},
                { id: '10', idSong: 10, name: 'City Looks Pretty', artist: 'Courtney Barnett', genre: "Indie rock", tags: ["female", "urban", "melodic"]}
            ];
            //mockRecommendationEntity.recommendedSongs.push(...newSongs);
            //await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
            const updatedPlaylist= await mockRecommendationRepository.updateRec(mockRecommendationEntity, newSongs);
            //response = await request.put(`/recommendations/${mockRecommendationEntity.userId}/more`);
            response = await request.post(`/recommendations/playlist/more`);
            console.log(response.body);

            //const updatedPlaylist = await mockRecommendationRepository.getRecommendationByUserId(mockRecommendationEntity.userId);
            expect(updatedPlaylist).toBeDefined();
            expect(updatedPlaylist!.recommendedSongs).toHaveLength(10); // Initially 5 recommendations, then more 5
            
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode)); //200
        });

        and('o JSON da resposta deve ser uma playlist de músicas', () => {
            expect(response.body).toBeDefined();
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toHaveLength(10);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('idSong');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('artist');
            expect(response.body[0]).toHaveProperty('genre');
            expect(response.body[0]).toHaveProperty('tags');
        });

        and(/^as músicas "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", "(.*)",  "(.*)", "(.*)", "(.*)", "(.*)" estão na playlist$/, 
            async (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) => {
                const updatedPlaylist = await mockRecommendationRepository.getRecommendationByUserId(mockRecommendationEntity.userId);
                expect(updatedPlaylist).toBeDefined();
                expect(updatedPlaylist!.recommendedSongs).toHaveLength(10);
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

        when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async (POST, url) => {
            response = await request.get('/recommendations/generate').query({ userId: mockRecommendationEntity.userId });
            console.log(response.body);
        });

        then (/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode)); //400
        });


        and (/^o sistema mostra uma mensagem de erro "(.*)"$/, async (errorMessage) => {
            expect(response.body.message).toBe(errorMessage);
        });
    });

    test('Ver histórico de recomendações', ({ given, when, then, and }) => {
        given(/^A usuária "(.*)" está no sistema$/, async (username) => {
            /*mockRecommendationEntity = new RecommendationEntity({
                userId: username,
                recommendedSongs: [],
                recommendationHistory: [
                    { id: '1', idSong: 1, name: 'Ride', artist: 'Lana Del Rey', genre: "Art pop", tags: ["melancholic", "female", "longing"]}, 
                    { id: '2', idSong: 2, name: 'Age of Love', artist: 'Charlotte de Witte', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '3', idSong: 3, name: 'Legacy', artist: 'Sara Landry', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '4', idSong: 4, name: 'Dori Me', artist: 'Deborah de Luca', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                    { id: '5', idSong: 5, name: 'Metal Heart', artist: 'Cat Power', genre: "Slowcore", tags: ["female", "melancholic", "dark", "hypnotic"]}
                ],
            });
            //await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);*/
            await mockRecommendationRepository.createRec(username);
            await mockRecommendationRepository.updateRec(mockRecommendationEntity, mockRecommendationEntity.recommendedSongs);
        });

        and(/^a playlist "(.*)" associada a usuária "(.*)" tem as músicas "(.*)", "(.*)", "(.*)", "(.*)", "(.*)"$/, 
            async (arg0, arg1, arg2, arg3, arg4, arg5, arg6) => {
            //mockRecommendationEntity.recommendationHistory = recommendedSongs.split(', ');
            const newRecs = [
                { id: '1', idSong: 1, name: 'Ride', artist: 'Lana Del Rey', genre: "Art pop", tags: ["melancholic", "female", "longing"]}, 
                { id: '2', idSong: 2, name: 'Age of Love', artist: 'Charlotte de Witte', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '3', idSong: 3, name: 'Legacy', artist: 'Sara Landry', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '4', idSong: 4, name: 'Dori Me', artist: 'Deborah de Luca', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '5', idSong: 5, name: 'Metal Heart', artist: 'Cat Power', genre: "Slowcore", tags: ["female", "melancholic", "dark", "hypnotic"]}
            ];
            //await mockRecommendationRepository.createOrUpdateRecommendation(mockRecommendationEntity);
            //const username='user1';
            //await mockRecommendationRepository.createRec(username);
            await mockRecommendationRepository.updateRec(mockRecommendationEntity, newRecs);
        });

        when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async (GET, url) => {
            //response = await request.get(`/recommendations/${mockRecommendationEntity.userId}/history`);
            response = await request.get(`/recommendations/history`);
            console.log(response.body);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode)); //200
        });

        and (/^o JSON da resposta deve ser uma playlist de músicas$/, () => {
            expect(response.body).toBeDefined();
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            //expect(response.body.length).toBe(5); // Check if the playlist has 5 songs
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('idSong');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('artist');
            expect(response.body[0]).toHaveProperty('genre');
            expect(response.body[0]).toHaveProperty('tags');

            const expectedSongs = [
                { id: '1', idSong: 1, name: 'Ride', artist: 'Lana Del Rey', genre: "Art pop", tags: ["melancholic", "female", "longing"]}, 
                { id: '2', idSong: 2, name: 'Age of Love', artist: 'Charlotte de Witte', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '3', idSong: 3, name: 'Legacy', artist: 'Sara Landry', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '4', idSong: 4, name: 'Dori Me', artist: 'Deborah de Luca', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
                { id: '5', idSong: 5, name: 'Metal Heart', artist: 'Cat Power', genre: "Slowcore", tags: ["female", "melancholic", "dark", "hypnotic"]}
            ];
            for (const song of expectedSongs) {
                expect(response.body).toContain(song); // Check if each song is in the playlist
            }
        });

        and(/^as músicas "(.*)", "(.*)", "(.*)", "(.*)", "(.*)" estão na playlist$/, 
            async (arg0, arg1, arg2, arg3, arg4) => {
                const historyPlaylist = response.body;
                expect(historyPlaylist).toBeDefined();
                //expect(historyPlaylist.songs).toEqual(recommendedSongs.split(', '));
        });

        //And as músicas “Ride-Lana Del Rey”, “Age of Love-Charlotte de Witte”, 
        // “Legacy-Sara Landry”, “Dori Me-Deborah de Luca”, “Metal Heart-Cat Powder” estão na playlist
    });
});




