// Playlist.vue

<template>
  <div>
    <h1>More Recommendations</h1>
    <ul>
      <li v-for="song in playlist" :key="song.id">
          <div>
            <button @click="playSong(song.id)">Play Song</button>
            {{ song.name }} - {{ song.artist }}
            <button @click="deleteSong(song.id)">Delete</button>
          </div>
      </li>
    </ul>
    <button v-if="showLoadMoreButton" @click="loadMore">Ver mais</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
//import { getRec, deleteOneRec, getMoreRec } from '../services/apiService'; // Assuming API functions are defined here

const router = useRouter();

const playlist = ref([
  { id: 1, name: 'Song 1', artist: 'Artist 1', genre: 'Genre 1', tags: ['Tag 1', 'Tag 2'] },
  { id: 2, name: 'Song 2', artist: 'Artist 2', genre: 'Genre 2', tags: ['Tag 3', 'Tag 4'] },
  { id: 3, name: 'Song 3', artist: 'Artist 3', genre: 'Genre 3', tags: ['Tag 5', 'Tag 6'] },
  { id: 4, name: 'Song 4', artist: 'Artist 4', genre: 'Genre 4', tags: ['Tag 7', 'Tag 8'] },
  { id: 5, name: 'Song 5', artist: 'Artist 5', genre: 'Genre 5', tags: ['Tag 9', 'Tag 10'] },
  { id: 6, name: 'Song 6', artist: 'Artist 6', genre: 'Genre 6', tags: ['Tag 11', 'Tag 12'] },
  { id: 7, name: 'Song 7', artist: 'Artist 7', genre: 'Genre 7', tags: ['Tag 13', 'Tag 14'] },
  { id: 8, name: 'Song 8', artist: 'Artist 8', genre: 'Genre 8', tags: ['Tag 15', 'Tag 16'] },
  { id: 9, name: 'Song 9', artist: 'Artist 9', genre: 'Genre 9', tags: ['Tag 17', 'Tag 18'] },
  { id: 10, name: 'Song 10', artist: 'Artist 10', genre: 'Genre 10', tags: ['Tag 19', 'Tag 20'] }
]);

//const songs = ref([...initialSongs]); // Original playlist
//const visibleSongs = ref([...initialSongs.slice(0, 5)]); // Initially show 5 songs
const showLoadMoreButton = ref(true); // Show "Ver mais" button initially

const playSong = (songId: number) => {
  const song = playlist.value.find(song => song.id === songId);
  if (song) {
    console.log(`Playing ${song.name} - ${song.artist}`);
    const audioPlayer = new Audio(); // Create a new audio player
    fetch("http://localhost:5175/recommendations/playlist/song.id")
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

/*const deleteSong = async (songId: number) => {
  try {
    await deleteOneRec(songId); // Assuming deleteOneRec is an API function to delete a song
    const index = songs.value.findIndex(song => song.id === songId);
    if (index !== -1) {
      songs.value.splice(index, 1); // Remove the song from the array
      reloadPlaylistPage(); // Call function to reload the playlist page
    }
  } catch (error) {
    console.error('Failed to delete song:', error);
  }
};*/

const loadMore = () => {};

/*const loadMore = async () => {
  try {
    const moreSongs = await getMoreRec(); // Assuming getMoreRec is an API function to fetch more songs
    const additionalSongs = moreSongs.slice(0, 5); // Get the next 5 songs
    visibleSongs.value = [...visibleSongs.value, ...additionalSongs]; // Add them to the visibleSongs array
    showLoadMoreButton.value = false; // Hide "Ver mais" button after loading more
  } catch (error) {
    console.error('Failed to load more songs:', error);
  }
};*/

const deleteSong = (songId:number) => {
    playlist.value = playlist.value.filter(song => song.id !== songId);
    reloadRecommendationPlaylist(); //reload the page
};
      
const reloadRecommendationPlaylist = () => {
    router.push('/user/recommendations/playlist/more');
};

</script>

<style scoped>
button {
  background-color: plum;
  color: black;
}

body {
  background-color: white;
}
</style>
  
 