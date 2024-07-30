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

    public async getSongById(id: string): Promise<SongEntity | null> { // Method to get a song by its id
        try {
            const song = await this.findOne((item) => item.id === id);
            return song;
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public filterSongsByGenreAndTags(allSongs: SongEntity[], filterSongs: SongEntity[]): SongEntity[] {
        const filteredSongs: SongEntity[] = [];

        for (const song of allSongs) {
            if (song.genre === filterSongs[0].genre && this.hasSimilarTags(song.tags, filterSongs[0].tags)) {
                filteredSongs.push(song);
            }
        }

        return filteredSongs;
    }

    private hasSimilarTags(tags1: string[], tags2: string[]): boolean {
        const commonTags = tags1.filter(tag => tags2.includes(tag));
        return commonTags.length > 0;
    }
}

export default SongRepository;

