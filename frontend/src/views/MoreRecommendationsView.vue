// Playlist.vue

<template>
  <div>
    <h1>More Recommendations</h1>
    <ul>
      <li v-for="song in playlist" :key="song.id">
          <div>
            <button class="purple-button"@click="playSong(song.id)">Play Song</button>
            {{ song.name }} - {{ song.artist }}
            <button class="purple-button"@click="deleteSong(song.id)">Delete</button>
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
  { id: 1, name: "Uusi teknokratia", artist: "Oranssi Pazuzu", genre: "Black Metal", tags: ["dark","hypnotic", "concept", "psychedelic"]},
    { id: 2, name: "Cleansing", artist: "Wolves in the Throne Room", genre: "Black Metal", tags: ["dark", "heavy", "hypnotic", "forest"] },
    { id: 3, name: "Freezing Moon", artist: "Mayem", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter"] },
    { id: 4, name: "Dearth", artist: "Deathspell Omega", genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
    { id: 5, name: "Blood Fire Death", artist: "Bathory", genre: "Black Metal", tags: ["dark", "heavy","aggressive", "pagan"]},
    { id: 6, name: "Persephone", artist: "Cocteau Twins", genre: "Dream Pop", tags: ["ethereal", "dreamy", "atmospheric"]},
    { id: 7, name: "Dagger", artist: "Slowdive", genre: "Dream Pop", tags: ["ethereal", "dreamy", "atmospheric"]},
    { id: 8, name: "Sometimes", artist: "My Bloody Valentine", genre: "Dream Pop", tags: ["ethereal", "dreamy", "atmospheric"]},
    { id: 9, name: "Space Song", artist: "Beach House", genre: "Dream Pop", tags: ["ethereal", "dreamy", "atmospheric"]},
    { id: 10, name: "Falling", artist: "Julee Cruise", genre: "Dream Pop", tags: ["ethereal", "dreamy", "atmospheric", "hypnotic", "dark"]},
    { id: 11, name: "Same Deep Water as You", artist: "The Cure", genre: "Gothic Rock", tags: ["dark", "melancholic", "atmospheric"]},
    { id: 12, name: "Spellbound", artist: "Siouxsie and the Banshees", genre: "Gothic Rock", tags: ["dark", "melancholic", "atmospheric"]},
    { id: 13, name: "Bela Lugosi's Dead", artist: "Bauhaus", genre: "Gothic Rock", tags: ["dark", "melancholic", "atmospheric"]},
    { id: 14, name: "Lucretia My Reflection", artist: "The Sisters of Mercy", genre: "Gothic Rock", tags: ["dark", "melancholic", "atmospheric"]},
    { id: 15, name: "Moonchild", artist: "Fields of the Nephilim", genre: "Gothic Rock", tags: ["dark", "melancholic", "atmospheric"]},
    { id: 16, name: "I Know it's over", artist: "The Smiths", genre: "Indie Pop", tags: ["melancholic", "longing"]},
    { id: 17, name: "She's My Baby", artist: "Mazzy Star", genre: "Dream Pop", tags: ["melancholic", "atmospheric", "psychedelic"]},
    { id: 18, name: "A Forest", artist: "The Cure", genre: "Post Punk", tags: ["dark", "melancholic", "atmospheric"]},
    { id: 19, name: "Love Will Tear Us Apart", artist: "Joy Division", genre: "Post Punk", tags: ["dark", "intense", "atmospheric"]},
    { id: 20, name: "Transilvanian Hunger", artist: "Darkthrone", genre: "Black Metal", tags: ["dark", "raw", "atmospheric"] },
    { id: 21, name: "I Am the Black Wizards", artist: "Emperor", genre: "Black Metal", tags: ["epic", "symphonic", "melodic"] },
    { id: 22, name: "Funeral Fog", artist: "Mayhem", genre: "Black Metal", tags: ["iconic", "controversial", "raw"] },
    { id: 23, name: "Dunkelheit", artist: "Burzum", genre: "Black Metal", tags: ["ambient", "experimental", "atmospheric"] },
    { id: 24, name: "Hvis lyset tar oss", artist: "Burzum", genre: "Black Metal", tags: ["atmospheric", "raw", "contemplative"] },
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

body {
  background-color: white;
}
</style>
  
 