import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import PlaylistRepository from '../../src/repositories/playlist.repository';
import PlaylistEntity from '../../src/entities/playlist.entity';

const feature = loadFeature('tests/features/playlists.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    // mocking the repository
    let mockPlaylistRepository: PlaylistRepository;
    let response: supertest.Response;
    let mockPlaylistEntity: PlaylistEntity;
  
    beforeEach(() => {
      mockPlaylistRepository = di.getRepository<PlaylistRepository>(PlaylistRepository);
    });
  

    test('Criar uma Playlist', ({ given, when, then, and }) => {
        given(/^que o usuário está logado$/, async () => {});
    
        when(/^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com o nome "(.*)" e descrição "(.*)"$/,
            async (url, playlistName, playlistDescription) => {
              response = await request.post(url).send({
                name: playlistName,
                description: playlistDescription,
              });
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode, 10));
        });


        and(/^o JSON da resposta deve conter o nome "(.*)" e descrição "(.*)"$/, (playlistName, playlistDescription) => {
            expect(response.body.data).toEqual(
              expect.objectContaining({
                name: playlistName,
                description: playlistDescription,
              })
            );
        });

    });
  
    //////////////////

    test('Uptade de uma playlist', ({ given, when, then, and }) => {
        given(/^que o PlaylistRepository tem uma playlist com id "(.*)" e nome "(.*)"$/, async (playlistId, playlistName) => {
            mockPlaylistEntity = new PlaylistEntity({
                id: playlistId,
                name: playlistName,
            })

            await mockPlaylistRepository.createPlaylist(mockPlaylistEntity);
        });

        when(/^uma requisição PUT for enviada para "(.*)" com o corpo da requisição sendo um JSON com o nome "(.*)"$/,
            async (url, playlistName) => {
              response = await request.put(url).send({
                name: playlistName,
              });
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
                expect(response.status).toBe(parseInt(statusCode, 10));
        });

        and(/^o JSON da resposta deve conter o nome "(.*)"$/, (playlistName) => {
            expect(response.body.data).toEqual(
              expect.objectContaining({
                name: playlistName,
              })
            );
        });
             

    });
  


  
  });
  
