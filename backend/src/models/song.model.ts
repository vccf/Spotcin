import BaseModel from './base.model';

class SongModel extends BaseModel{
    //id: number;
    idSong: number;
    name: string;
    artist: string;
    genre: string;
    tags: string[];

    constructor({ id, idSong, name, artist, genre = '', tags = [] }: 
        { id: string; idSong: number, name: string; artist: string; genre: string; tags: string[];}) {
        super(id);
        this.idSong = idSong;
        this.name = name;
        this.artist = artist;
        this.genre = genre;
        this.tags = tags;
    }
}

export default SongModel;