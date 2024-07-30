import SongEntity from '../entities/song.entity';
import SongRepository from '../repositories/song.repository';

class SongService {

    private songs: SongRepository;

    constructor(songs: SongRepository) {
        this.songs = songs;
    }

}

export default SongService;