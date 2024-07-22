<template>
    <div>
        <h1> Playlist Recommendations </h1>
        <ul>
            <li v-for="song in playlist.songs" :key="song.id">
                <div>
                    {{ song.name }} - {{ song.artist }}
                    <button class="purple-button"@click="removeSongFromPlaylist(song.id)">Delete</button>
                </div>
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
        { id: 1, name: 'Song 1', artist: 'Artist 1' },
        { id: 2, name: 'Song 2', artist: 'Artist 2' },
        { id: 3, name: 'Song 3', artist: 'Artist 3' },
        { id: 4, name: 'Song 4', artist: 'Artist 4' },
        { id: 5, name: 'Song 5', artist: 'Artist 5' },
        { id: 6, name: 'Song 6', artist: 'Artist 6' },
        { id: 7, name: 'Song 7', artist: 'Artist 7' },
        { id: 8, name: 'Song 8', artist: 'Artist 8' },
        { id: 9, name: 'Song 9', artist: 'Artist 9' },
        { id: 10, name: 'Song 10', artist: 'Artist 10'}
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