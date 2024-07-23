import BaseModel from './base.model';

class Song {
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
}

class RecommendationModel extends BaseModel {
    userId: string;
    listenedSongs: Song [];
    recommendedSongs: Song[];
    recommendationHistory: Song[];

    constructor({
        id,
        userId,
        listenedSongs =[],
        recommendedSongs =[],
        recommendationHistory = [],
    }: {
        id: string;
        userId: string;
        listenedSongs?: Song[];
        recommendedSongs?: Song[];
        recommendationHistory?: Song[];
    }) {
        super(id);
        this.userId = userId;
        this.listenedSongs = listenedSongs;
        this.recommendedSongs = recommendedSongs;
        this.recommendationHistory = recommendationHistory;
    }
}

export default RecommendationModel;
