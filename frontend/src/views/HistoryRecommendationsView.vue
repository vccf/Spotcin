<template>
  <div>
    <h1>History Recommendations</h1>
    <ul>
      <li v-for="song in playlist" :key="song.id">
          <button class="purple-button"@click="playSong(song.id)">Play Song</button>
          <p>{{ song.name }} - {{ song.artist }}</p>
          <button class="purple-button"@click="deleteSong(song.id)">Delete</button>
      </li>
    </ul>
    <button class="purple-button" v-if="showLoadMoreButton" @click="loadMore">Ver mais</button>
  </div>
</template>

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
</style>

<script setup lang="ts">
import { ref } from 'vue';

// Define historyRecommendations as a reactive ref array
const playlist = ref([
  { id: 1, name: "Uusi teknokratia", artist: "Oranssi Pazuzu", genre: "Black Metal", tags: ["dark","hypnotic", "concept", "psychedelic"]},
  { id: 2, name: "Cleansing", artist: "Wolves in the Throne Room", genre: "Black Metal", tags: ["dark", "heavy", "hypnotic", "forest"] },
  { id: 3, name: "Freezing Moon", artist: "Mayem", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter"] },
  { id: 4, name: "Dearth", artist: "Deathspell Omega", genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
  { id: 23, name: "Dunkelheit", artist: "Burzum", genre: "Black Metal", tags: ["ambient", "experimental", "atmospheric"] },
  { id: 25, name: "Dead as Dreams", artist: "Weakling", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "melancholic", "winter", "atmospheric"]},
  { id: 27, name: "Chorea Macchabeorum", artist: "Blut aus Nord", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter", "atmospheric"]},
  { id: 28, name: "Maze of Phobetor", artist: 'Akhlys', genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
  { id: 29, name: "Exercises in Futility V", artist: "Mgla", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter", "atmospheric"]},
  { id: 30, name: "A Fine Day to Die", artist: "Bathory", genre: "Black Metal", tags: ["aggressive", "heavy", "dark", "pagan"]},
]);

const playSong = (songId: number) => {
  const song = playlist.value.find(song => song.id === songId);
  if (song) {
    console.log(`Playing ${song.name} - ${song.artist}`);
    const audioPlayer = new Audio(); // Create a new audio player
    fetch("https://example.com/api/songs/1")
    .then(response => response.json())
    .then(data => {
      const song = data.song;
      const audioPlayer = new Audio();
      audioPlayer.src = song.url;
      audioPlayer.play();})
    .catch(error => {
      console.error("Error fetching song:", error);
    });
  }
}

const deleteSong = (songId:number) => {
    playlist.value = playlist.value.filter(song => song.id !== songId);
    reloadRecommendationPlaylist(); //reload the page
};
      
const reloadRecommendationPlaylist = () => {
    router.push('/recommendations/playlist/history');
};

</script>
