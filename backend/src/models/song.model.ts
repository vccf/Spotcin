import BaseModel from './base.model';

class SongModel extends BaseModel{
    //id: number;
    name: string;
    artist: string;
    genre: string;
    tags: string[];

    constructor({ id, name, artist, genre = '', tags = [] }: 
        {id: string; name: string; artist: string; genre?: string; tags?: string[];}) {
        super(id);
        this.name = name;
        this.artist = artist;
        this.genre = genre;
        this.tags = tags;
    }
}

export default SongModel;