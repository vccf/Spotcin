<template>
    <div>
        <h1>Playlist Recommendations</h1>
        <p>Here are some recommendations for you:</p>
        <ul>
            <li v-for="song in playlist" :key="song.id">
                <button class="purple-button" @click="playSong(song.id)">Play</button>
                <p>{{ song.name }} - {{ song.artist }}</p>
                <button class="purple-button"@click="removeSongFromPlaylist(song.id)">Delete</button>    
            </li>
        </ul>
        <button class="purple-button" v-if="showLoadMoreButton" @click="loadMore">Ver mais</button>
        <VerMais/>
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

.excluir-button {
    margin-left: 10px;
    background-color: plum;
}

.ver-mais-button {
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

<script setup lang="ts">
//import Playlist from '../components/Playlist.vue';
//import PlaySong from "../components/PlaySong.vue";
//import Excluir from "../components/Excluir.vue";
//import VerMais from "../components/VerMais.vue";
import { ref } from 'vue';
import { useApiService } from '../services/apiService';
import { useRouter} from 'vue-router';

const router=useRouter();
const { getRecommendations, deleteSong, getMoreRecommendations } = useApiService ();

const playlist = ref([
    { id: 1, name: "Uusi teknokratia", artist: "Oranssi Pazuzu", genre: "Black Metal", tags: ["dark","hypnotic", "concept", "psychedelic"]},
    { id: 2, name: "Cleansing", artist: "Wolves in the Throne Room", genre: "Black Metal", tags: ["dark", "heavy", "hypnotic", "forest"] },
    { id: 3, name: "Freezing Moon", artist: "Mayem", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter"] },
    { id: 4, name: "Dearth", artist: "Deathspell Omega", genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
    { id: 23, name: "Dunkelheit", artist: "Burzum", genre: "Black Metal", tags: ["ambient", "experimental", "atmospheric"] },
]);

const playlistExpanded = ref([
    { id: 25, name: "Dead as Dreams", artist: "Weakling", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "melancholic", "winter", "atmospheric"]},
    { id: 27, name: "Chorea Macchabeorum", artist: "Blut aus Nord", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter", "atmospheric"]},
    { id: 28, name: "Maze of Phobetor", artist: 'Akhlys', genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
    { id: 29, name: "Exercises in Futility V", artist: "Mgla", genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter", "atmospheric"]},
    { id: 30, name: "A Fine Day to Die", artist: "Bathory", genre: "Black Metal", tags: ["aggressive", "heavy", "dark", "pagan"]},
]);

const secPlaylistExpanded = ref([
    { id: 5, name: "Blood Fire Death", artist: "Bathory", genre: "Black Metal", tags: ["dark", "heavy","aggressive", "pagan"]},  
    { id: 20, name: "Transilvanian Hunger", artist: "Darkthrone", genre: "Black Metal", tags: ["dark", "raw", "atmospheric"] },
    { id: 21, name: "I Am the Black Wizards", artist: "Emperor", genre: "Black Metal", tags: ["epic", "symphonic", "melodic"] },
    { id: 22, name: "Funeral Fog", artist: "Mayhem", genre: "Black Metal", tags: ["iconic", "controversial", "raw"] },
    { id: 26, name: "Neither Meaning nor Justice", artist: "Deathspell Omega", genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
]);

const showLoadMoreButton = ref(true); // Show "Ver mais" button initially

const getRec = async () => {
    try {
        const response = await getRecommendations ((playlist));
        if (response.code === 200) {
            console.log (response);
            router.push('/');
        } else {
            console.log('Erro');
            console.log(response);
        }
    }catch (error){
        console.error('Erro', error);
        //console.log(error.response.data.msg);    
    }
};

const song = { id: 1, name: 'Song 1', artist: 'Artist 1' }; //THIS IS JUST SO I CAN SLEEP

const deleteOneRec = async () => {
    try {
        const response = await deleteSong (song);
        if (response.code === 200) {
            console.log (response);
            router.push('/');
        } else {
            console.log('Erro');
            console.log(response);
        }
    } catch (error) {
        console.error('Erro', error);
        //console.log(error.response.data.msg);
    } 
};

const getMoreRec = async () => {
    try {
        const response = await getMoreRecommendations ((playlist));
        if (response.code === 200) {
            console.log (response);
            router.push('/');
        } else {
            console.log('Erro');
            console.log(response);
        }
    }catch (error) {
        console.error('Erro', error);
        //console.log(error.response.data.msg);
    }
};

//const showLoadMoreButton = ref(true);

//const loadMore = () => {};

/*const loadMore = async () => {
  try {
    const moreSongs = await getMoreRec(); // Assuming getMoreRec is an API function to fetch more songs
    //const additionalSongs = moreSongs.slice(0, 5); // Get the next 5 songs
    //visibleSongs.value = [...visibleSongs.value, ...additionalSongs]; // Add them to the visibleSongs array
    showLoadMoreButton.value = false; // Hide "Ver mais" button after loading more
  } catch (error) {
    console.error('Failed to load more songs:', error);
  }
};*/

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

const removeSongFromPlaylist = (songId) => {
    playlist.value = playlist.value.filter(song => song.id !== songId);
    reloadRecommendationPlaylist(); //reload the page
};
      
const reloadRecommendationPlaylist = () => {
    router.push('/recommendations/playlist');
};

let loadMoreCounter = 0;

const loadMore = () => {
    loadMoreCounter++;
    if (loadMoreCounter === 1) {
        playlist.value = [...playlist.value, ...playlistExpanded.value];
        reloadRecommendationPlaylist();
    } else if (loadMoreCounter === 2) {
        loadMoreTwice();
    }
};

const loadMoreTwice = () => {
    playlist.value = [...playlist.value, ...secPlaylistExpanded.value];
    reloadRecommendationPlaylist();
    showLoadMoreButton.value = false; //button Ver mais disappears after loading more
};

</script>