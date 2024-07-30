import RecommendationEntity from '../entities/recommendation.entity';
import PlaylistEntity from '../entities/playlist.entity';
import { InternalServerError } from '../utils/errors/http.error';
import BaseRepository from './base.repository';
import SongEntity from '../entities/song.entity';
import SongRepository from './song.repository';

/*class Song {
    id: string;
    name: string;
    artist: string;
    genre?: string;
    tags?: string[];

    constructor({ id, name, artist, genre = '', tags = [] }: Song) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.genre = genre;
        this.tags = tags;
    }
}*/

class RecommendationRepository extends BaseRepository<RecommendationEntity> {
    constructor() {
        super('recommendations'); // initialize the repository for the 'recommendations' collection/table.
    }

    public songRepository: SongRepository = new SongRepository();
    //allSongs=this.songRepository.getAllSongs();

    public recs: RecommendationEntity = new RecommendationEntity({ userId: '1', listenedSongs: [], recommendedSongs: [], recommendationHistory: [] });

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

    /*userRecs1 = [
        { id: '1', idSong:1, name: "Uusi teknokratia", artist: "Oranssi Pazuzu", genre: "Black Metal", tags: ["dark","hypnotic", "concept", "psychedelic"]},
        { id: '2', idSong:2, name: "Cleansing", artist: "Wolves in the Throne Room", genre: "Black Metal", tags: ["dark", "heavy", "hypnotic", "forest"] },
        { id: '3', idSong: 3, name: "Freezing Moon", artist: "Mayem", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter"] },
        { id: '4', idSong: 4, name: "Dearth", artist: "Deathspell Omega", genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
        { id: '5', idSong: 5, name: "Blood Fire Death", artist: "Bathory", genre: "Black Metal", tags: ["dark", "heavy","aggressive", "pagan"]},
    ];*/

    firstPlaylistRec : SongEntity [] = [
        { id: '1', idSong: 1, name: 'Ride', artist: 'Lana Del Rey', genre: "Art pop", tags: ["melancholic", "female", "longing"]}, 
        { id: '2', idSong: 2, name: 'Age of Love', artist: 'Charlotte de Witte', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
        { id: '3', idSong: 3, name: 'Legacy', artist: 'Sara Landry', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
        { id: '4', idSong: 4, name: 'Dori Me', artist: 'Deborah de Luca', genre: "Techno", tags: ["female", "repetitive", "hypnotic"]}, 
        { id: '5', idSong: 5, name: 'Metal Heart', artist: 'Cat Power', genre: "Slowcore", tags: ["female", "melancholic", "dark", "hypnotic"]}
    ];

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

    mockRec = new RecommendationEntity({ 
        userId: 'user1', 
        listenedSongs: [], 
        recommendedSongs: [], 
        recommendationHistory: []});

    userId1 = 'user1';

    public async checkUserHistory(): Promise<void> {
        try {
            if (this.userHistory.length === 0 || this.userHistory.length < 5) {
                throw new Error('No listened songs found');
            }
            throw 'User listened enough songs for recommendations';
        }
        catch (e) {
            throw new InternalServerError();
        }
    }

    public async getRecs(): Promise<RecommendationEntity> {
        try {
            //this.recommendationHistory = this.playlistRec;
            return new RecommendationEntity({ 
                userId: this.userId1, 
                listenedSongs: [], 
                recommendedSongs: this.playlistRec, 
                recommendationHistory: this.playlistRec});
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public async getMoreRecs(): Promise<RecommendationEntity> {
        try {
            const newPlaylist = [...this.playlistRec, ...this.playlistRecExpanded];
            return new RecommendationEntity({ 
                userId: this.userId1, 
                listenedSongs: [], 
                recommendedSongs: newPlaylist, 
                recommendationHistory: newPlaylist});
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public async getHistRec (): Promise<RecommendationEntity> {
        try {
            const newPlaylist = [...this.playlistRec, ...this.playlistRecExpanded];
            return new RecommendationEntity({
                userId: this.userId1, 
                listenedSongs: this.userHistory, 
                recommendedSongs: newPlaylist, 
                recommendationHistory: newPlaylist});
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public async deleteOneRec (song: SongEntity): Promise<void> {
        try {
            const updatedPlaylist = this.playlistRec.filter(songObj => songObj.name !== song.name);
            this.playlistRec = updatedPlaylist;
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public async createRec (userId: string): Promise <RecommendationEntity> {
        try {
            return new RecommendationEntity({ 
                userId: userId, 
                listenedSongs: [], 
                recommendedSongs: [], 
                recommendationHistory: [] });
            
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public async updateRec (rec: RecommendationEntity, upPlay: SongEntity[]): Promise<RecommendationEntity> {
        try {
            const newRecPlay = [...rec.recommendedSongs, ...upPlay];
            const newHistPlay = [...rec.recommendationHistory, ...upPlay];
            //rec.recommendationHistory.concat(upPlay)
            return rec = new RecommendationEntity({
                userId: rec.userId, 
                listenedSongs: rec.listenedSongs,
                recommendedSongs: newRecPlay,
                recommendationHistory: newHistPlay});
        } catch (e) {
            console.error('Error updating recommendation:', e);
            throw new InternalServerError({
                msg: 'Failed to update recommendation'
            });
        }
    } 

    












    //public async getUserHistory(): Promise<SongEntity[]> {
    public getUserHistory(): SongEntity[] {
        try {
            //const listenedSongs: Song[] = []; // Initialize an empty array to store the listened songs
            // Add logic to fetch the listened songs from the database or any other data source
            // For now, let's assume the listened songs are already available in the 'listenedSongs' array
            //this.recs.listenedSongs = await this.songRepository.getAllSongs();
            if (this.recs.listenedSongs.length === 0) {
                throw new Error('No listened songs found'); // Throw an error if the array is empty
            }
            return this.recs.listenedSongs;
        } catch (error) {
            throw new Error ('server error'); // Throw an InternalServerError with the error message
        }
    }

    public getUserId(): string {
        return this.recs.userId;
    }

    public async getAllRecommendations(): Promise<RecommendationEntity[]> {
        try {
            return await this.findAll();
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public convertToSongs(songEntities: SongEntity[]): SongEntity[] {
        return songEntities.map((songEntity: SongEntity) => {
            const { id, name, artist, genre, tags } = songEntity;
            return new SongEntity({ id, name, artist, genre, tags });
        });
    }

    //convSongs = this.convertToSongs(this.allSongs);

    public async getRecommendedSongs(listenedSongs: SongEntity[]): Promise<SongEntity[]> {
        try {
            const recommendedSongs: SongEntity[] = [];
            for (const song of listenedSongs) {
                const genre = song.genre;
                const tags = song.tags;
                //const filteredSongs = this.allSongs.filter((s: Song) => s.genre === genre && this.areTagsSimilar(s.tags, tags));
                const filteredSongs = [{ id: '1', idSong:1,  name: 'Song1', artist: 'artist', genre: 'whatever', tags: []}] //RESEE THIS
                recommendedSongs.push(...filteredSongs.slice(0, 5));
            }
            return recommendedSongs;
        } catch (e) {
            throw new InternalServerError();
        }
    }

    private areTagsSimilar(tags1: string[], tags2: string[]): boolean {
        // Implement your logic to determine if the tags are similar
        // For example, you can check if they have at least one common tag
        return tags1.some(tag => tags2.includes(tag));
    }

    public async getRecommendationByUserId(userId: string): Promise<RecommendationEntity | undefined> {
        try {
            const recommendations = await this.findAll();
            const songs = recommendations.flatMap(rec => rec.recommendedSongs);
            //return songs;
            return recommendations.find(rec => rec.userId === userId); //RESEE THIS
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

    public async deleteSongFromRecommendation(userId: string, song: SongEntity): Promise<void> {
        try {
            const recommendation = await this.getRecommendationByUserId(userId);
            if (recommendation) {
                const updatedSongs = recommendation.recommendedSongs.filter(songObj => songObj.name !== song.name);
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

    public async addSongToRecommendation(userId: string, song: SongEntity): Promise<void> {
        try {
            const recommendation = await this.getRecommendationByUserId(userId);
            if (recommendation) {
                const updatedSongs = [...recommendation.recommendedSongs, song];
                const updatedRecommendation = {
                    ...recommendation,
                    recommendedSongs: updatedSongs,
                };
                //await this.updateRecommendationByUserId(updatedRecommendation, userId); RESEE THIS
            }
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public async checkUserListeningHistory(userId: string, userHistory: SongEntity[]): Promise<void> {
        try {
            if (userHistory.length === 0 || userHistory.length < 5) {
                throw new Error('No listened songs found');
            }
            this.recs.userId = userId;
            this.recs.listenedSongs = userHistory;
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public async getMoreRecommendations(userId: string): Promise<SongEntity[]> {
        try {
            const userHistory = this.getUserHistory();
            await this.checkUserListeningHistory(userId, userHistory);
            const listenedSongs = this.recs.listenedSongs;
            const recommendedSongs = await this.getRecommendedSongs(listenedSongs);
            const recommendation = new RecommendationEntity({
                userId,
                listenedSongs,
                recommendedSongs,
                recommendationHistory: [],
            });
            await this.createOrUpdateRecommendation(recommendation);
            return recommendedSongs;
        } catch (e) {
            throw new InternalServerError();
        }
    }

    public async getMoreRecommendationsDouble(userId: string): Promise<SongEntity[]> {
        try {
            const userHistory = this.getUserHistory();
            await this.checkUserListeningHistory(userId, userHistory);
            const listenedSongs = this.recs.listenedSongs;
            const recommendedSongs = await this.getRecommendedSongs(listenedSongs);
            const recommendation = new RecommendationEntity({
                userId,
                listenedSongs,
                recommendedSongs,
                recommendationHistory: [],
            });
            await this.createOrUpdateRecommendation(recommendation);
            return recommendedSongs;
        } catch (e) {
            throw new InternalServerError();
        }
    }
}

export default RecommendationRepository;
