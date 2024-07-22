<template>
    <div>
        <!-- Display your playlist here -->
        <ul>
            <li v-for="song in playlist" :key="song.title">
            {{ song.title }} - {{ song.artist }}
            </li>
        </ul>
        <button @click="loadMoreSongs">Ver Mais</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
//import Playlist from '../components/Playlist.vue';

// Define playlist as a reactive ref array
const playlist = ref([
    { title: 'Song 1', artist: 'Artist 1' },
    { title: 'Song 2', artist: 'Artist 2' },
    { title: 'Song 3', artist: 'Artist 3' },
    { title: 'Song 4', artist: 'Artist 4' },
    { title: 'Song 5', artist: 'Artist 5' }
]);

const loadMoreSongs = () => {
    // Add logic to load more songs
    // Assuming you have an array of songs called "playlist"
    playlist.value = [...playlist.value, ...loadMoreSongsFromServer()];
};

const loadMoreSongsFromServer = () => {
    // Make an API call to fetch more songs from the server
    //const response = await fetch('https://api.example.com/songs');
    //const newSongs = await response.json();
    const newSongs=[]; //PLS REDO THIS, THIS IS JUST SO I CAN SLEEP
    return newSongs;
    // Return the new songs as an array
    //return fetchMoreSongs();
};

const fetchMoreSongs = () => {
    // Simulating fetching more songs from the server
    // Replace this with your actual API call
    const newSongs = [
        { title: 'Song 6', artist: 'Artist 6' },
        { title: 'Song 7', artist: 'Artist 7' },
        { title: 'Song 8', artist: 'Artist 8' },
        { title: 'Song 9', artist: 'Artist 9' },
        { title: 'Song 10', artist: 'Artist 10' }
    ];
    return newSongs;
};

</script>

<style scoped>

    .play-button {
        margin-right: 10px;
        background-color: purple;
    }

    .excluir-button {
        margin-left: 10px;
        background-color: purple;
    }

    .ver-mais-button {
        background-color: purple;
        color: white;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
    }

    body {
        background-color: white;
    }
</style>