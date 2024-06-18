import PlaylistModel from '../models/playlist.model';
import PlaylistRepository from '../repositories/playlist.repository';
import { NotFoundError, InternalServerError } from '../utils/errors/http.error';
import PlaylisEntity from '../entities/playlist.entity';

class PlaylistServiceMessageCode {
    public static readonly playlist_not_found = 'playlist_not_found';
    public static readonly playlist_update_error = 'playlist_update_error';
    public static readonly playlist_creation_error = 'playlist_creation_error';
}


class PlaylistService {
  private playlistRepository: PlaylistRepository;

  constructor(playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository;
  }

  public async getPlaylists(): Promise<PlaylistModel[]>{
    const playlistEntity = await this.playlistRepository.getPlaylists()

    const playlistsModel = playlistEntity.map((play) => new PlaylistModel(play));

    //Adicionar um erro?

    return playlistsModel;
  }

  public async getPlaylistById(id: string): Promise<PlaylistModel>{
    const playlistEntity = await this.playlistRepository.getPlaylistById(id);

    if(!playlistEntity){
      throw new NotFoundError({
        msg: 'Playlist id not found',
        msgCode: PlaylistServiceMessageCode.playlist_not_found,
      });
    }

    const playlistModel = new PlaylistModel(playlistEntity);

    return playlistModel;
  }

  public async deletePlaylistById(id: string): Promise<void>{
    await this.playlistRepository.deletePlaylistById(id);

    //Adicionar um erro?
  }
  
  public async updatePlaylistById(newPlaylist: PlaylisEntity, id: string): Promise<PlaylistModel>{
    const playlistEntity = await this.playlistRepository.updatePlaylistById(newPlaylist, id);

    if(!playlistEntity){
      throw new NotFoundError({
        msg: 'Playlist uptade by id error',
        msgCode: PlaylistServiceMessageCode.playlist_update_error,
      });
    }
    
    const playlistModel = new PlaylistModel(playlistEntity);

    return playlistModel;
  }

  public async createPlaylist(newPlaylist: PlaylisEntity): Promise<PlaylistModel>{
    const playlistEntity = await this.playlistRepository.createPlaylist(newPlaylist);
    
    if(!playlistEntity){
      throw new InternalServerError({
        msg: 'Playlist could not be created',
        msgCode: PlaylistServiceMessageCode.playlist_creation_error,
      });
    }

    const playlistModel = new PlaylistModel(playlistEntity);

    return playlistModel;
  }

  public async deleteSongUsingPlaylistId(song: string, id: string): Promise<void>{
    await this.playlistRepository.deleteSongUsingPlaylistId(song, id);

    //add erro?
  }

  public async addSongUsingPlaylistId(song: string, id: string): Promise<void>{
    await this.playlistRepository.addSongUsingPlaylistId(song, id);

    //add erro?
  }

}
export default PlaylistService;