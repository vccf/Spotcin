import BaseEntity from './base.entity';

class SongEntity extends BaseEntity {
    //id: number;
    name: string;
    artist: string;
    genre?: string;
    tags?: string[];

    constructor(data: Partial<SongEntity>) {
        super(data.id || '');
        this.name = data.name || '';
        this.artist = data.artist || '';
        this.genre = data.genre || '';
        this.tags = data.tags || [];
        //this.recommendationDate = data.recommendationDate || new Date();
    }
}

export default SongEntity;