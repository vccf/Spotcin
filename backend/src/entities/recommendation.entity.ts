import BaseEntity from './base.entity';

class RecommendationEntity extends BaseEntity {
    userId: string; // each recommendation is associated with a user
    recommendedSongs: string[]; // Array of song IDs or titles
    recommendationHistory: string[];
    //recommendationDate: Date;

    constructor(data: Partial<RecommendationEntity>) {
        super(data.id || '');
        this.userId = data.userId || '';
        this.recommendedSongs = data.recommendedSongs || [];
        this.recommendationHistory = data.recommendationHistory || [];
        //this.recommendationDate = data.recommendationDate || new Date();
    }
}

export default RecommendationEntity;
