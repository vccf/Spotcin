import BaseModel from './base.model';

class RecommendationModel extends BaseModel {
    userId: string;
    recommendedSongs: string[];
    recommendationHistory: string[];

    constructor({
        id,
        userId,
        recommendedSongs,
        recommendationHistory = [],
    }: {
        id: string;
        userId: string;
        recommendedSongs: string[];
        recommendationHistory?: string[];
    }) {
        super(id);
        this.userId = userId;
        this.recommendedSongs = recommendedSongs;
        this.recommendationHistory = recommendationHistory;
    }
}

export default RecommendationModel;
