import BaseEntity from './base.entity';

class Song {
    id: number;
    name: string;
    artist: string;
    genre?: string;
    tags?: string[];
}

class RecommendationEntity extends BaseEntity {
    userId: string; // each recommendation is associated with a user
    listenedSongs: Song []; //array of user listening history
    recommendedSongs: Song[]; // array of songs that are recommended to the user
    recommendationHistory: Song[];
    //recommendationDate: Date;

    constructor(data: Partial<RecommendationEntity>) {
        super(data.id || '');
        this.userId = data.userId || '';
        this.listenedSongs = data.listenedSongs || [];
        this.recommendedSongs = data.recommendedSongs || [];
        this.recommendationHistory = data.recommendationHistory || [];
        //this.recommendationDate = data.recommendationDate || new Date();
    }
}

export default RecommendationEntity;
