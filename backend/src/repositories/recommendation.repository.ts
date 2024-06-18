import RecommendationEntity from '../entities/recommendation.entity';
import { InternalServerError } from '../utils/errors/http.error';
import BaseRepository from './base.repository';

class RecommendationRepository extends BaseRepository<RecommendationEntity> {
    constructor() {
        super('recommendations'); // initialize the repository for the 'recommendations' collection/table.
    }

    public async getAllRecommendations(): Promise<RecommendationEntity[]> {
        try {
            return await this.findAll();
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public async getRecommendationByUserId(userId: string): Promise<RecommendationEntity | undefined> {
        try {
            const recommendations = await this.findAll();
            return recommendations.find(rec => rec.userId === userId);
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public async deleteRecommendationByUserId(userId: string): Promise<void> {
        try {
            const recommendation = await this.getRecommendationByUserId(userId);
            if (recommendation) {
                await this.delete(rec => rec.userId === userId);
            }
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public async updateRecommendationByUserId(newRecommendation: RecommendationEntity, userId: string): Promise<RecommendationEntity | undefined> {
        try {
            const existingRecommendation = await this.getRecommendationByUserId(userId);
            if (existingRecommendation) {
                const updatedRecommendation = {
                    ...existingRecommendation,
                    ...newRecommendation,
                };
                return await this.update(rec => rec.userId === userId, updatedRecommendation) || undefined;
            }
            return undefined;
        } catch (e) {
            throw new InternalServerError();
        }
    }

    //Checks if a recommendation exists for a user and either updates or creates a new recommendation.
    public async createOrUpdateRecommendation(newRecommendation: RecommendationEntity): Promise<RecommendationEntity | undefined> {
        try {
            const existingRecommendation = await this.getRecommendationByUserId(newRecommendation.userId);
            if (existingRecommendation) {
                return await this.updateRecommendationByUserId(newRecommendation, newRecommendation.userId);
            } else {
                return await this.add(newRecommendation);
            }
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public async deleteSongFromRecommendation(userId: string, song: string): Promise<void> {
        try {
            const recommendation = await this.getRecommendationByUserId(userId);
            if (recommendation) {
                const updatedSongs = recommendation.recommendedSongs.filter(name => name !== song);
                const updatedRecommendation = {
                    ...recommendation,
                    recommendedSongs: updatedSongs,
                };
                await this.updateRecommendationByUserId(updatedRecommendation, userId);
            }
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public async addSongToRecommendation(userId: string, song: string): Promise<void> {
        try {
            const recommendation = await this.getRecommendationByUserId(userId);
            if (recommendation) {
                const updatedSongs = [...recommendation.recommendedSongs, song];
                const updatedRecommendation = {
                    ...recommendation,
                    recommendedSongs: updatedSongs,
                };
                await this.updateRecommendationByUserId(updatedRecommendation, userId);
            }
        } catch (e) {
            throw new InternalServerError();
        }
    }
}

export default RecommendationRepository;
