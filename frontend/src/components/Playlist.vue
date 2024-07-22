<template>
  <div>
    <h1>Playlist</h1>
    <ul>
      <li v-for="song in songs" :key="song.id">
        {{ song.name }} - {{ song.artist }}
        <button @click="deleteSong(song.id)">Delete</button>
      </li>
    </ul>
    <button v-if="showLoadMoreButton" @click="loadMore">Ver mais</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const songs = ref([
  { id: 1, name: 'Song 1', artist: 'Artist 1' },
  { id: 2, name: 'Song 2', artist: 'Artist 2' },
  { id: 3, name: 'Song 3', artist: 'Artist 3' },
  { id: 4, name: 'Song 4', artist: 'Artist 4' },
  { id: 5, name: 'Song 5', artist: 'Artist 5' }
]);

const songsExpanded = ref([
  { id: 1, name: 'Song 1', artist: 'Artist 1' },
  { id: 2, name: 'Song 2', artist: 'Artist 2' },
  { id: 3, name: 'Song 3', artist: 'Artist 3' },
  { id: 4, name: 'Song 4', artist: 'Artist 4' },
  { id: 5, name: 'Song 5', artist: 'Artist 5' },
  { id: 6, name: 'Song 6', artist: 'Artist 6' },
  { id: 7, name: 'Song 7', artist: 'Artist 7' },
  { id: 8, name: 'Song 8', artist: 'Artist 8' },
  { id: 9, name: 'Song 9', artist: 'Artist 9' },
  { id: 10, name: 'Song 10', artist: 'Artist 10' }
]);

const deleteSong = (songId: number) => {
  const index = songs.value.findIndex(song => song.id === songId);
  if (index !== -1) {
    songs.value.splice(index, 1); // Remove the song from the array
    reloadPlaylistPage(); // Call function to reload the playlist page
  }
};

const reloadPlaylistPage = () => {
  router.push('/recommendations/playlist');
};

//const expandedSongs = ref([...songs.value]); // Copy of the original playlist
const showLoadMoreButton = ref(true); // Show "Ver mais" button initially

const loadMore = () => {
  //visibleSongs.value = [...songs.value.slice(0, 10)]; // Show 10 songs
  //const additionalSongs = songs.value.slice(5, 10); // Get next 5 songs from the original playlist
  //visibleSongs.value = [...visibleSongs.value, ...additionalSongs]; // Add them to the visibleSongs array
  showLoadMoreButton.value = false; // Hide "Ver mais" button after loading more
};

export{
  songs,
  deleteSong,
  reloadPlaylistPage
};
</script>

<style scoped>
  h1 {
    color: purple;
    font-size: 50px;
    text-align: center;
    margin-top: 50px;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
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

  button:hover {
    background-color: purple;
  }

/* scoped styles for Playlist component */
</style>
