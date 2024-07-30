import BaseEntity from './base.entity';

class SongEntity extends BaseEntity {
    //id: number;
    idSong: number;
    name: string;
    artist: string;
    genre: string;
    tags: string[];

    constructor(data: Partial<SongEntity>) {
        super(data.id || '');
        this.idSong = data.idSong || -1;
        this.name = data.name || '';
        this.artist = data.artist || '';
        this.genre = data.genre || '';
        this.tags = data.tags || [];
    }
}

export default SongEntity;