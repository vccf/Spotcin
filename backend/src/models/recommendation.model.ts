import BaseModel from './base.model';
import SongEntity from '../entities/song.entity';

/*class Song {
    id: number;
    name: string;
    artist: string;
    genre: string;
    tags: string[];

    constructor({ id, name, artist, genre = '', tags = [] }: Song) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.genre = genre;
        this.tags = tags;
    }
}*/

class RecommendationModel extends BaseModel {
    userId: string;
    listenedSongs: SongEntity [];
    recommendedSongs: SongEntity[];
    recommendationHistory: SongEntity[];

    constructor({
        id,
        userId,
        listenedSongs =[],
        recommendedSongs =[],
        recommendationHistory = [],
    }: {
        id: string;
        userId: string;
        listenedSongs: SongEntity[];
        recommendedSongs: SongEntity[];
        recommendationHistory: SongEntity[];
    }) {
        super(id);
        this.userId = userId;
        this.listenedSongs = listenedSongs;
        this.recommendedSongs = recommendedSongs;
        this.recommendationHistory = recommendationHistory;
    }
}

export default RecommendationModel;
