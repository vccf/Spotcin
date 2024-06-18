import RecommendationEntity from '../entities/recommendation.entity';
import PlaylistEntity from '../entities/playlist.entity';

class RecommendationService {
    private recommendations: RecommendationEntity[];

    constructor() {
        this.recommendations = [];
    }

    // Method to generate recommended songs based on user's listening history
    generateRecommendations(userId: string, userHistory: string[]): PlaylistEntity {
        const recommendedSongs = userHistory.slice(0, 5); // Recommend first 5 songs

        const recommendation = new RecommendationEntity({
            userId,
            recommendedSongs,
            recommendationHistory: [],
        });

        this.recommendations.push(recommendation);

        return new PlaylistEntity({
            name: 'Recommended songs',
            description: 'Playlist of recommended songs based on your listening history.',
            songs: recommendedSongs,
            categories: ['Recommendations'],
        });
    }

    // Method to get more recommendations
    getMoreRecommendations(userId: string, userHistory: string[]): PlaylistEntity {
        const recommendedSongs = userHistory.slice(5, 10); // Recommend next 5 songs

        const existingRecommendation = this.recommendations.find(rec => rec.userId === userId);
        if (existingRecommendation) {
            existingRecommendation.recommendedSongs.push(...recommendedSongs);
        }

        return new PlaylistEntity({
            name: 'See more recommendations',
            description: 'Additional recommended songs based on your listening history.',
            songs: recommendedSongs,
            categories: ['Recommendations'],
        });
    }

    // Method to get recommendation history
    //Retrieves the full history of recommended songs for a user
    getRecommendationHistory(userId: string): PlaylistEntity {
        const existingRecommendation = this.recommendations.find(rec => rec.userId === userId);

        if (existingRecommendation) {
            return new PlaylistEntity({
                name: 'Recommendation History',
                description: 'Playlist of all previously recommended songs.',
                songs: existingRecommendation.recommendationHistory,
                categories: ['Recommendations'],
            });
        }

        return new PlaylistEntity({
            name: 'Recommendation History',
            description: 'No recommendation history found.',
            songs: [],
            categories: ['Recommendations'],
        });
    }

    // Method to delete a song from recommended songs
    deleteRecommendedSong(userId: string, songIndex: number): PlaylistEntity | string {
        const existingRecommendation = this.recommendations.find(rec => rec.userId === userId);

        if (existingRecommendation && existingRecommendation.recommendedSongs.length > songIndex) {
            const deletedSong = existingRecommendation.recommendedSongs.splice(songIndex, 1)[0];
            return new PlaylistEntity({
                name: 'Recommended songs',
                description: 'Updated playlist after deleting a recommended song.',
                songs: existingRecommendation.recommendedSongs,
                categories: ['Recommendations'],
            });
        }

        return 'Invalid song index or no recommendations found.';
    }

    // Method to check if user listened enough songs for recommendations
    checkUserListeningHistory(userId: string, userHistory: string[]): string | null {
        if (userHistory.length < 5) {
            return "You didn't listen to enough songs to be recommended new ones.";
        }
        return null;
    }
}

export default RecommendationService;











