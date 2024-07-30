import RecommendationEntity from '../entities/recommendation.entity';
import PlaylistEntity from '../entities/playlist.entity';
import RecommendationRepository from '../repositories/recommendation.repository';
import SongEntity from '../entities/song.entity';
import SongRepository from '../repositories/song.repository';

/*class Song {
    id: number;
    name: string;
    artist: string;
    genre?: string;
    tags?: string[];
}*/

class RecommendationService {
    //private recommendations: RecommendationEntity[];

    //constructor() {
    //this.recommendations = [];
    //}

    private recommendations: RecommendationRepository;
    private songs: SongRepository;

    constructor(recommendations: RecommendationRepository) {
        this.recommendations = recommendations;
    }

    getSongNames(songs: SongEntity[]): string[] {
        return songs.map(song => song.name);
    }

    async getAllSongs(): Promise<SongEntity[]> {
        return await this.songs.getAllSongs();
    }

    recPlay=this.filterSongsByGenreAndTags([{ id: '1', idSong: 1, name: 'Song1', artist: 'artist', genre: 'Pop', tags:[]}], [{ id: '1', idSong: 1, name: 'Song1', artist: 'artist', genre: 'Pop', tags:[]}])

    // Method to generate recommended songs based on user's listening history
    //async generateRecommendations(userId: string, userHistory: SongEntity[]): Promise<PlaylistEntity | string> {
    async generateRecommendations(userId: string, userHistory: SongEntity[]): Promise<SongEntity[] | string> {
        
        try {
            const recommendedSongs = userHistory.slice(0, 5); // Recommend first 5 songs

            const recommendation = new RecommendationEntity({
                userId,
                //listenedSongs: userHistory,
                recommendedSongs : [],
                recommendationHistory: [],
            });

            this.recommendations.add(recommendation);

            /*return new PlaylistEntity({
                name: 'Recommended songs',
                description: 'Playlist of recommended songs based on your listening history.',
                songs: this.getSongNames(recommendedSongs),
                categories: ['Recommendations'],
            });*/
            return this.recPlay;
        } catch (error) {
            console.error("Error in getMoreRecommendations:", error);
            return 'An error occurred while processing your request.';
        }
    }


    // Method to get more recommendations
    //async getMoreRecommendations(userId: string, userHistory: string[]): Promise <PlaylistEntity | string> {
    //if (userHistory==null)
    /*return "You didn't listen to enough songs to be recommended new ones."
const recommendedSongs = userHistory.slice(5, 10); // Recommend next 5 songs

const existingRecommendation = this.recommendations.findOne(rec => rec.userId === userId);
if (existingRecommendation) {
    if (typeof existingRecommendation != 'undefined'){
       existingRecommendation as RecommendationEntity
         existingRecommendation.recommendedSongs.push(...recommendedSongs);
    }
}

return new PlaylistEntity({
    name: 'See more recommendations',
    description: 'Additional recommended songs based on your listening history.',
    songs: recommendedSongs,
    categories: ['Recommendations'],
});
}*/
    async filterSongsByGenreAndTags(listenedSongs: SongEntity[], allSongs: SongEntity[]): Promise<SongEntity[]> {
        const filteredSongs: SongEntity[] = [];
        for (const song of allSongs) {
            if (listenedSongs.some(listenedSong => listenedSong.genre === song.genre)) {
                filteredSongs.push(song);
            } else if (listenedSongs.some(listenedSong => listenedSong.tags?.some(tag => song.tags?.includes(tag)))) {
                filteredSongs.push(song);
            }
        }
        return filteredSongs;
    }

    //async getMoreRecommendations(userId: string, userHistory: SongEntity []): Promise<PlaylistEntity | string> {
    async getMoreRecommendations(userId: string, userHistory: SongEntity []): Promise<SongEntity[] | string> {
        
        try {
            if (!userHistory || userHistory.length < 5) {
                return "You didn't listen to enough songs to be recommended new ones.";
            }

            //const allSongs = await this.songs.getAllSongs();
            const allSongs = [{ id: '1', idSong: 1, name: 'Song1', artist: 'artist', genre: 'Pop', tags:[]}] //RESEE THIS

            const recs = this.filterSongsByGenreAndTags(userHistory, allSongs);

            const recommendedSongs = userHistory.slice(5, 10); // Recommend next 5 songs

            const existingRecommendation = await this.recommendations.getRecommendationByUserId(userId);
            if (existingRecommendation) {
                //existingRecommendation.recommendedSongs.push(...recommendedSongs);
                await this.recommendations.updateRecommendationByUserId(existingRecommendation, userId);
            }

            /*return new PlaylistEntity({
                name: 'See more recommendations',
                description: 'Additional recommended songs based on your listening history.',
                //songs: recommendedSongs,
                songs: ['Song1', 'Song2', 'Song3', 'Song4', 'Song5'],
                categories: ['Recommendations'],
            });*/
            return this.recPlay;
        } catch (error) {
            console.error("Error in getMoreRecommendations:", error);
            return 'An error occurred while processing your request.';
        }
    }

    // Method to get recommendation history
    //Retrieves the full history of recommended songs for a user
    //async getRecommendationHistory(userId: string): Promise<PlaylistEntity | string > {
    async getRecommendationHistory(userId: string): Promise<SongEntity[] | string > {
        try {
            const existingRecommendation = await this.recommendations.findOne(rec => rec.userId === userId);

            if (existingRecommendation) {
                /*return new PlaylistEntity({
                    name: 'Recommendation History',
                    description: 'Playlist of all previously recommended songs.',
                    //songs: this.getSongNames(existingRecommendation.recommendationHistory),
                    categories: ['Recommendations'],
                });*/
                return this.recPlay;
            }

            /*return new PlaylistEntity({
                name: 'Recommendation History',
                description: 'No recommendation history found.',
                songs: [],
                categories: ['Recommendations'],
            });*/
            return 'No recommendation history found.';
        } catch (error) {
            console.error("Error in getMoreRecommendations:", error);
            return 'An error occurred while processing your request.';
        }
    }

    // Method to delete a song from recommended songs
    //async deleteRecommendedSong(userId: string, songIndex: number): Promise<PlaylistEntity | string> {
    async deleteRecommendedSong(userId: string, songIndex: number): Promise<SongEntity[] | string>{
        try {
            const existingRecommendation = await this.recommendations.findOne(rec => rec.userId === userId);

            if (existingRecommendation && existingRecommendation.recommendedSongs.length > songIndex) {
                const deletedSong = existingRecommendation.recommendedSongs.splice(songIndex, 1)[0];

                // Update the recommendation in the repository
                this.recommendations.updateRecommendationByUserId(existingRecommendation, userId);

                /*return new PlaylistEntity({
                    name: 'Recommended songs',
                    description: 'Updated playlist after deleting a recommended song.',
                    //songs: this.getSongNames(existingRecommendation.recommendedSongs),
                    categories: ['Recommendations'],
                });*/
                return [
                    {
                        id: '1',
                        idSong: 1,
                        name: 'Song1',
                        artist: 'artist',
                        genre: 'Pop',
                        tags: []
                    },
                    {
                        id: '2',
                        idSong: 2,
                        name: 'Song2',
                        artist: 'artist',
                        genre: 'Rock',
                        tags: []
                    },
                    {
                        id: '3',
                        idSong: 3,
                        name: 'Song3',
                        artist: 'artist',
                        genre: 'Hip Hop',
                        tags: []
                    },
                    {
                        id: '4',
                        idSong: 4,
                        name: 'Song4',
                        artist: 'artist',
                        genre: 'Electronic',
                        tags: []
                    },
                    {
                        id: '5',
                        idSong: 5,
                        name: 'Song5',
                        artist: 'artist',
                        genre: 'R&B',
                        tags: []
                    }
                ];
            }

            return 'Invalid song index or no recommendations found.';
        } catch (error) {
            console.error("Error in deleteRecommendedSong:", error);
            return 'An error occurred while deleting the recommended song.';
        }
    }

    // Method to check if user listened enough songs for recommendations
    checkUserListeningHistory(userId: string, userHistory: string[]): string | null {
        if (userHistory == null || userHistory.length < 5) {
            return "You didn't listen to enough songs to be recommended new ones.";
        }
        return null;
    }
}

export default RecommendationService;











