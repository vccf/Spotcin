<template>
    <div>
        <h1>Playlist Recommendations</h1>
        <p>Here are some recommendations for you:</p>
        <ul>
            <li v-for="song in playlist" :key="song.id">
                <button class="purple-button" @click="playSong(song.id)">Play</button>
                <p>{{ song.name }} - {{ song.artist }}</p>
                <button class="purple-button"@click="deleteSongFromCurrentPlaylist()">Delete</button>    
            </li>
        </ul>
        <button class="purple-button"showLoadMoreButton @click="loadMore">Ver mais</button>
    </div>    
</template>
      
<script setup lang="ts">
import { useApiService } from '../services/apiService';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const { deleteSongFromPlaylist } = useApiService();

const playlist = ref([
    { id: 1, name: 'Neither Meaning nor Justice', artist: 'Deathspell Omega' },
    { id: 2, name: 'Chorea Macchabeorum', artist: 'Blut aus Nord' },
    { id: 3, name: 'Maze of Phobetor', artist: 'Akhlys' },
    { id: 4, name: 'Exercises in Futility V', artist: 'Mgla'},
    { id: 5, name: 'A Fine Day to Die', artist: 'Artist Bathory' },
    { id: 6, name: 'Song 6', artist: 'Artist 6' },
    { id: 7, name: 'Song 7', artist: 'Artist 7' },
    { id: 8, name: 'Song 8', artist: 'Artist 8' },
    { id: 9, name: 'Song 9', artist: 'Artist 9' },
    { id: 10, name: 'Song 10', artist: 'Artist 10'}
]);
      
const reloadRecommendationPlaylist = () => {
    router.push('/user/recommendations/playlist');
};

const songId = ref(7); // Example song ID

const deleteSongFromCurrentPlaylist = async () => {
    try {
        const response = await deleteSongFromPlaylist({ songId });
        if (response.code === 200) {
            console.log('Song deleted successfully');
            console.log(response);
            reloadRecommendationPlaylist();
        } else {
            console.log('Failed to delete song from playlist:', response);
        }
    } catch (error) {
        console.error('Failed to delete song from playlist:', error);
        //showErrorOnForm(error.response.data.msg);
    }
};

const loadMore = async () => {};
const playSong = (songId: number) => {};
</script>

<style scoped>
h1 {
    color: plum;
    font-size: 50px;
    text-align: center;
    margin-top: 50px;
}
li {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.purple-button {
    background-color: plum;
    color: black;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}
.purple-button:hover {
    background-color: plum;
    color: white;
}
body {
    background-color: white;
}
</style>