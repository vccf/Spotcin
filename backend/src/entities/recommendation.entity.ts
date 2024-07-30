import BaseEntity from './base.entity';
import SongEntity from './song.entity';

class RecommendationEntity extends BaseEntity {
    userId: string; // each recommendation is associated with a user
    listenedSongs: SongEntity []; //array of user listening history
    recommendedSongs: SongEntity[]; // array of songs that are recommended to the user
    recommendationHistory: SongEntity[];
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
