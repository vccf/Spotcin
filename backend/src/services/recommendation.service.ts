import RecommendationEntity from '../entities/recommendation.entity';
import PlaylistEntity from '../entities/playlist.entity';
import RecommendationRepository from '../repositories/recommendation.repository';
import SongEntity from '../entities/song.entity';
import SongRepository from '../repositories/song.repository';
import { NotFoundError, InternalServerError } from '../utils/errors/http.error';

/*class Song {
    id: number;
    name: string;
    artist: string;
    genre?: string;
    tags?: string[];
}*/

class RecommendationServiceMessageCode {
    public static readonly not_listened_enough_songs = 'not_listened_enough_songs';
    public static readonly filter_songs_error = 'filter_songs_error';
    public static readonly generate_rec_playlist_error = 'playlist_creation_error';
    public static readonly see_rec_history_error = 'see_rec_history_error';
    public static readonly see_more_rec_error = 'see_more_rec_error';
    public static readonly delete_song_error = 'delete_song_error';
}

class RecommendationService {
    //private recommendations: RecommendationEntity[];

    //constructor() {
    //this.recommendations = [];
    //}
    
    private recEntity: RecommendationEntity;
    private recommendations: RecommendationRepository= new RecommendationRepository();
    private songs: SongRepository = new SongRepository();

    constructor(recommendations: RecommendationRepository) {
        this.recommendations = recommendations;
    }

    getSongNames(songs: SongEntity[]): string[] {
        return songs.map(song => song.name);
    }

    async getAllSongs(): Promise<SongEntity[]> {
        return await this.songs.getAllSongs();
    }

    allSongs: SongEntity[] = [
        { id: '1', idSong:1, name: "Uusi teknokratia", artist: "Oranssi Pazuzu", genre: "Black Metal", tags: ["dark","hypnotic", "concept", "psychedelic"]},
        { id: '2', idSong:2, name: "Cleansing", artist: "Wolves in the Throne Room", genre: "Black Metal", tags: ["dark", "heavy", "hypnotic", "forest"] },
        { id: '3', idSong: 3, name: "Freezing Moon", artist: "Mayem", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter"] },
        { id: '4', idSong: 4, name: "Dearth", artist: "Deathspell Omega", genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
        { id: '5', idSong: 5, name: "Blood Fire Death", artist: "Bathory", genre: "Black Metal", tags: ["dark", "heavy","aggressive", "pagan"]},
        { id: '6', idSong: 6, name: "Persephone", artist: "Cocteau Twins", genre: "Dream Pop", tags: ["ethereal", "dreamy", "atmospheric"]},
        { id: '7', idSong: 7, name: "Dagger", artist: "Slowdive", genre: "Dream Pop", tags: ["ethereal", "dreamy", "atmospheric"]},
        { id: '8', idSong: 8, name: "Sometimes", artist: "My Bloody Valentine", genre: "Dream Pop", tags: ["ethereal", "dreamy", "atmospheric"]},
        { id: '9', idSong: 9, name: "Space Song", artist: "Beach House", genre: "Dream Pop", tags: ["ethereal", "dreamy", "atmospheric"]},
        { id: '10', idSong: 10, name: "Falling", artist: "Julee Cruise", genre: "Dream Pop", tags: ["ethereal", "dreamy", "atmospheric", "hypnotic", "dark"]},
        { id: '11', idSong: 11, name: "Same Deep Water as You", artist: "The Cure", genre: "Gothic Rock", tags: ["dark", "melancholic", "atmospheric"]},
        { id: '12', idSong: 12, name: "Spellbound", artist: "Siouxsie and the Banshees", genre: "Gothic Rock", tags: ["dark", "melancholic", "atmospheric"]},
        { id: '13', idSong: 13, name: "Bela Lugosi's Dead", artist: "Bauhaus", genre: "Gothic Rock", tags: ["dark", "melancholic", "atmospheric"]},
        { id: '14', idSong: 14, name: "Lucretia My Reflection", artist: "The Sisters of Mercy", genre: "Gothic Rock", tags: ["dark", "melancholic", "atmospheric"]},
        { id: '15', idSong: 15, name: "Moonchild", artist: "Fields of the Nephilim", genre: "Gothic Rock", tags: ["dark", "melancholic", "atmospheric"]},
        { id: '16', idSong: 16, name: "I Know it's over", artist: "The Smiths", genre: "Indie Pop", tags: ["melancholic", "longing"]},
        { id: '17', idSong: 17, name: "She's My Baby", artist: "Mazzy Star", genre: "Dream Pop", tags: ["melancholic", "atmospheric", "psychedelic"]},
        { id: '18', idSong: 18, name: "A Forest", artist: "The Cure", genre: "Post Punk", tags: ["dark", "melancholic", "atmospheric"]},
        { id: '19', idSong: 19, name: "Love Will Tear Us Apart", artist: "Joy Division", genre: "Post Punk", tags: ["dark", "intense", "atmospheric"]},
        { id: '20', idSong: 20, name: "Transilvanian Hunger", artist: "Darkthrone", genre: "Black Metal", tags: ["dark", "raw", "atmospheric"] },
        { id: '21', idSong: 21, name: "I Am the Black Wizards", artist: "Emperor", genre: "Black Metal", tags: ["epic", "symphonic", "melodic"] },
        { id: '22', idSong: 22, name: "Funeral Fog", artist: "Mayhem", genre: "Black Metal", tags: ["iconic", "controversial", "raw"] },
        { id: '23', idSong: 23, name: "Dunkelheit", artist: "Burzum", genre: "Black Metal", tags: ["ambient", "experimental", "atmospheric"] },
        { id: '24', idSong: 24, name: "Hvis lyset tar oss", artist: "Burzum", genre: "Black Metal", tags: ["atmospheric", "raw", "contemplative"] },
        { id: '25', idSong: 25, name: 'Dead as Dreams', artist: 'Weakling', genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "melancholic", "winter", "atmospheric"]},
        { id: '26', idSong: 26, name: 'Neither Meaning nor Justice', artist: 'Deathspell Omega', genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
        { id: '27', idSong: 27, name: 'Chorea Macchabeorum', artist: 'Blut aus Nord', genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter", "atmospheric"]},
        { id: '28', idSong: 28, name: 'Maze of Phobetor', artist: 'Akhlys', genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
        { id: '29', idSong: 29, name: 'Exercises in Futility V', artist: 'Mgla', genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter", "atmospheric"]},
        { id: '30', idSong: 30, name: 'A Fine Day to Die', artist: 'Bathory', genre: "Black Metal", tags: ["aggressive", "heavy", "dark", "pagan"]},
    ];

    //userHistory=this.recommendations.getUserHistory();
    //allSongs=this.songs.getAllSongs();

    //userId=this.recommendations.getUserId;
    userId='user1';

    userHistory= [
        { id: '26', idSong: 26, name: 'Neither Meaning nor Justice', artist: 'Deathspell Omega', genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
        { id: '27', idSong: 27, name: 'Chorea Macchabeorum', artist: 'Blut aus Nord', genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter", "atmospheric"]},
        { id: '28', idSong: 28, name: 'Maze of Phobetor', artist: 'Akhlys', genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
        { id: '29', idSong: 29, name: 'Exercises in Futility V', artist: 'Mgla', genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter", "atmospheric"]},
        { id: '30', idSong: 30, name: 'A Fine Day to Die', artist: 'Bathory', genre: "Black Metal", tags: ["aggressive", "heavy", "dark", "pagan"]},
    ]; //RESEE THIS

    recPlay=this.filterSongsByGenreAndTags(this.userHistory, this.allSongs)
    recPlayExpanded=this.getFilteredSongs(this.userId, this.userHistory, this.allSongs)
    recPlayExpandDouble=this.get15Recommendations(this.userId, this.userHistory, this.allSongs)

    //userHistory=this.recommendations.getUserHistory();
    //allSongs=this.songs.getAllSongs();

    /*userRecs1 = [
        { id: '1', idSong:1, name: "Uusi teknokratia", artist: "Oranssi Pazuzu", genre: "Black Metal", tags: ["dark","hypnotic", "concept", "psychedelic"]},
        { id: '2', idSong:2, name: "Cleansing", artist: "Wolves in the Throne Room", genre: "Black Metal", tags: ["dark", "heavy", "hypnotic", "forest"] },
        { id: '3', idSong: 3, name: "Freezing Moon", artist: "Mayem", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter"] },
        { id: '4', idSong: 4, name: "Dearth", artist: "Deathspell Omega", genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
        { id: '5', idSong: 5, name: "Blood Fire Death", artist: "Bathory", genre: "Black Metal", tags: ["dark", "heavy","aggressive", "pagan"]},
    ];*/

    playlistRec: SongEntity [] =[
        { id: '1', idSong: 1, name: "Uusi teknokratia", artist: "Oranssi Pazuzu", genre: "Black Metal", tags: ["dark","hypnotic", "concept", "psychedelic"]},
        { id: '2', idSong: 2, name: "Cleansing", artist: "Wolves in the Throne Room", genre: "Black Metal", tags: ["dark", "heavy", "hypnotic", "forest"] },
        { id: '3', idSong: 3, name: "Freezing Moon", artist: "Mayem", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter"] },
        { id: '4', idSong: 4, name: "Dearth", artist: "Deathspell Omega", genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
        { id: '23', idSong: 23, name: "Dunkelheit", artist: "Burzum", genre: "Black Metal", tags: ["ambient", "experimental", "atmospheric"] },
    ];
    
    playlistRecExpanded : SongEntity []= [
        { id: '25', idSong: 25, name: "Dead as Dreams", artist: "Weakling", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "melancholic", "winter", "atmospheric"]},
        { id: '27', idSong: 27, name: "Chorea Macchabeorum", artist: "Blut aus Nord", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter", "atmospheric"]},
        { id: '28', idSong: 28, name: "Maze of Phobetor", artist: 'Akhlys', genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
        { id: '29', idSong: 29, name: "Exercises in Futility V", artist: "Mgla", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter", "atmospheric"]},
        { id: '30', idSong: 30, name: "A Fine Day to Die", artist: "Bathory", genre: "Black Metal", tags: ["aggressive", "heavy", "dark", "pagan"]},
    ];
    
    secRecPlaylistExpanded : SongEntity[] = [
        { id: '5', idSong: 5, name: "Blood Fire Death", artist: "Bathory", genre: "Black Metal", tags: ["dark", "heavy","aggressive", "pagan"]},  
        { id: '20', idSong: 20, name: "Transilvanian Hunger", artist: "Darkthrone", genre: "Black Metal", tags: ["dark", "raw", "atmospheric"] },
        { id: '21', idSong: 21, name: "I Am the Black Wizards", artist: "Emperor", genre: "Black Metal", tags: ["epic", "symphonic", "melodic"] },
        { id: '22', idSong: 22, name: "Funeral Fog", artist: "Mayhem", genre: "Black Metal", tags: ["iconic", "controversial", "raw"] },
        { id: '26', idSong: 26, name: "Neither Meaning nor Justice", artist: "Deathspell Omega", genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
    ];

    public async checkUserHistory(): Promise<void> {
        const recEn = await this.recEntity.listenedSongs.length
        const recs = await this.recommendations
        if (recEn === 0) {
            throw new Error("User history is empty.");
        }
        return await this.recommendations.checkUserHistory();
    }

    public async getRecs(): Promise<SongEntity[]> {
        const recEn = await this.recEntity.listenedSongs.length
        const recs = await this.recommendations
        if (recEn === 0) {
            throw new Error("User history is empty.");
        }
        return await this.recommendations.getRecs();
    }

    public async getMoreRecs(): Promise<SongEntity[]> {
        const recEn = await this.recEntity.recommendedSongs.length
        const recs = await this.recommendations
        if (recEn === 0) {
            throw new Error("Recommendation playlist is empty.");
        }
        return await this.recommendations.getMoreRecs();
    }

    public async getHistRec (): Promise<SongEntity[]> {
        const recEn = await this.recEntity.recommendationHistory.length
        const recs = await this.recommendations
        if (recEn === 0) {
            throw new Error("Recommendation history is empty.");
        }
        return await this.recommendations.getHistRec();
    }

    public async deleteOneRec (song: SongEntity): Promise<void> {
        const recs  = await this.recommendations.findOne(rec => rec.recommendedSongs.includes(song));
        if(!recs){
            throw new NotFoundError({
                msg: 'Song not found in recommendations',
                msgCode: RecommendationServiceMessageCode.delete_song_error,
            });
        }

        await this.recommendations.deleteOneRec(song);
    }

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
            console.log('Sucessfully generated recommendations');
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
        console.log('Sucessfully generated recommendations');
        return filteredSongs.slice(0, 5);
    }

    async getFilteredSongs(userId: string, userHistory: SongEntity[], allSongs: SongEntity[]): Promise<SongEntity[] | string> {
        try {
            if (!userHistory || userHistory.length < 5) {
                return "You didn't listen to enough songs to be recommended new ones.";
            }

            const allSongs = await this.songs.getAllSongs();

            const filteredSongs = await this.filterSongsByGenreAndTags(userHistory, allSongs);

            const recommendedSongs = filteredSongs.slice(0, 10); // Get first 15 songs

            const existingRecommendation = await this.recommendations.getRecommendationByUserId(userId);
            if (existingRecommendation) {
                await this.recommendations.updateRecommendationByUserId(existingRecommendation, userId);
            }
            console.log('Sucessfully generated recommendations');
            return recommendedSongs;
        } catch (error) {
            console.error("Error in getFilteredSongs:", error);
            return 'An error occurred while processing your request.';
        }
    }

    async get15Recommendations(userId: string, userHistory: SongEntity[], allSongs: SongEntity[]): Promise<SongEntity[] | string> {
        try {
            if (!userHistory || userHistory.length < 5) {
                return "You didn't listen to enough songs to be recommended new ones.";
            }

            const allSongs = await this.songs.getAllSongs();

            const filteredSongs = await this.filterSongsByGenreAndTags(userHistory, allSongs);

            const recommendedSongs = filteredSongs.slice(10, 15); // Recommend next 5 songs

            const existingRecommendation = await this.recommendations.getRecommendationByUserId(userId);
            if (existingRecommendation) {
                await this.recommendations.updateRecommendationByUserId(existingRecommendation, userId);
            }

            console.log('Sucessfully generated more recommendations');
            return recommendedSongs;
        } catch (error) {
            console.error("Error in getMoreRecommendations:", error);
            return 'An error occurred while processing your request.';
        }
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
                console.log('Sucessfully got recommendation history');
                return this.getRecommendationHistory(userId);
                //return this.recPlay;
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
        const currPlay=this.recPlay;
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
                (await currPlay).filter(song => song.id !== deletedSong.id);
                console.log('Sucessfully deleted recommended song');
                return currPlay;
                 /*[
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
                              throw new Error(             name: 'Song2',
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
                ];*/
            }

            return 'Invalid song index or no recommendations found.';
        } catch (error) {
            console.error("Error in deleteRecommendedSong:", error);
            return 'An error occurred while deleting the recommended song.';
        }
    }

    // Method to check if user listened enough songs for recommendations
    async checkUserListeningHistory(userId: string, userHistory: SongEntity[]): Promise<void> {
        if (!userHistory|| userHistory.length < 5) {
            throw new NotFoundError ({
                msg: 'You did not listen to enough songs to be recommended new ones',
                msgCode: RecommendationServiceMessageCode.not_listened_enough_songs,
            });
        }
        console.log('User listened enough songs for recommendations');
    }
}

export default RecommendationService;











