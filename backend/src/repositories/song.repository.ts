import SongEntity from '../entities/song.entity';
import { InternalServerError } from '../utils/errors/http.error';
import BaseRepository from './base.repository';

class SongRepository extends BaseRepository<SongEntity> {
    constructor() {
        super('songs'); // initialize the repository for the 'songs' collection/table.
    }

    public async getAllSongs(): Promise<SongEntity[]> { // Method to get all songs from the database
        try {
            const songs = await this.findAll();
            return songs;
        } catch (e) {
            throw new InternalServerError();
        }
    }
}

export default SongRepository;

