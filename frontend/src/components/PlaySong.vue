<template>
    <div>
        <h1>Play Song</h1>
        <button class="purple-button" @click="playSong(song)">Play</button>
    </div>
</template>

<style scoped>
    h1 {
        color: white;
    }
    button {
        margin: 10px;
        background-color: purple;
        color: black;
    }
</style>

<script setup lang="ts">
import { ref } from 'vue';

const song = { id: 1 , name: 'Song 1', artist: 'Artist 1', genre: 'Genre 1', tags: ['Tag 1', 'Tag 2'] };
const audioRef = ref<HTMLAudioElement | null>(null);

const playSong = (song: { id: number, name: string, artist: string }) => {
    console.log(`Playing ${song.name} by ${song.artist}`);
    if (audioRef.value) {
        audioRef.value.play();
    }
};

export {
    playSong
};
</script>

<audio ref="audioRef" :src="song.url" preload="auto"></audio>