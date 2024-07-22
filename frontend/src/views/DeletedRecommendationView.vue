<template>
    <div>
        <p> Playlist Recommendations </p>
        <ul>
            <li v-for="song in playlist.songs" :key="song.id">
                <PlaySong/>
                {{ song.title }} - {{ song.artist }}
                <button @click="removeSongFromPlaylist(song.id)">Remove Song</button>
            </li>
        </ul>
    </div>
</template>
      
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const playlist = ref({
    name: 'Recommendations Playlist',
    songs: [
        { id: 1, title: 'Song 1', artist: 'Artist 1' },
        { id: 2, title: 'Song 2', artist: 'Artist 2' },
        { id: 3, title: 'Song 3', artist: 'Artist 3' },
        { id: 4, title: 'Song 4', artist: 'Artist 4' },
        { id: 5, title: 'Song 5', artist: 'Artist 5' },
        { id: 6, title: 'Song 6', artist: 'Artist 6' },
        { id: 7, title: 'Song 7', artist: 'Artist 7' },
        { id: 8, title: 'Song 8', artist: 'Artist 8' },
        { id: 9, title: 'Song 9', artist: 'Artist 9' },
        { id: 10, title: 'Song 10', artist: 'Artist 10'}
        ]
    });

const removeSongFromPlaylist = (songId) => {
    playlist.value.songs = playlist.value.songs.filter(song => song.id !== songId);
    reloadRecommendationPlaylist(); //reload the page
};
      
const reloadRecommendationPlaylist = () => {
    router.push('/user/recommendations/playlist');
};

</script>

<style scoped>
li {
    background-color: plum;
    padding: 10px;
    margin-bottom: 5px;
    color: white;
}

button {
    background-color: plum;
    color: white;
    padding: 10px;
    margin-right: 10px;
    border: none;
    cursor: pointer;
}
</style>