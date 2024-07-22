<template>
    <div>
        <h1>Playlist Recommendations</h1>
        <p>Here are some recommendations for you:</p>
        <ul>
            <li v-for="song in playlist" :key="song.id">
                <button class="purple-button" @click="playSong(song.id)">Play</button>
                <p>{{ song.name }} - {{ song.artist }}</p>
                <button @click="removeSongFromPlaylist(song.id)">Remove Song</button>    
            </li>
        </ul>
        <button v-if="showLoadMoreButton" @click="loadMore">Ver mais</button>
        <VerMais/>
    </div>    
</template>

<style scoped>
li {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.play-button {
    margin-right: 10px;
    background-color: plum;
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
    { 
        id: 1, 
        name: 'Song 1', 
        artist: 'Artist 1', 
        genre: 'Genre 1', 
        tags: ['Tag 1', 'Tag 2']
    },
    { 
        id: 2, 
        name: 'Song 2', 
        artist: 'Artist 2', 
        genre: 'Genre 2', 
        tags: ['Tag 3', 'Tag 4']
    },
    { 
        id: 3, 
        name: 'Song 3', 
        artist: 'Artist 3', 
        genre: 'Genre 3', 
        tags: ['Tag 5', 'Tag 6']
    },
    { 
        id: 4, 
        name: 'Song 4', 
        artist: 'Artist 4', 
        genre: 'Genre 4', 
        tags: ['Tag 7', 'Tag 8']
    },
    { 
        id: 5, 
        name: 'Song 5', 
        artist: 'Artist 5', 
        genre: 'Genre 5', 
        tags: ['Tag 9', 'Tag 10']
    },
    { 
        id: 6, 
        name: 'Song 6', 
        artist: 'Artist 6', 
        genre: 'Genre 6', 
        tags: ['Tag 11', 'Tag 12']
    },
    { 
        id: 7, 
        name: 'Song 7', 
        artist: 'Artist 7', 
        genre: 'Genre 7', 
        tags: ['Tag 13', 'Tag 14']
    },
    { 
        id: 8, 
        name: 'Song 8', 
        artist: 'Artist 8', 
        genre: 'Genre 8', 
        tags: ['Tag 15', 'Tag 16']
    },
    { 
        id: 9, 
        name: 'Song 9', 
        artist: 'Artist 9', 
        genre: 'Genre 9', 
        tags: ['Tag 17', 'Tag 18']
    },
    { 
        id: 10, 
        name: 'Song 10', 
        artist: 'Artist 10', 
        genre: 'Genre 10', 
        tags: ['Tag 19', 'Tag 20']
    }
]);

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

const showLoadMoreButton = ref(true);

//const loadMore = () => {};

const loadMore = async () => {
  try {
    const moreSongs = await getMoreRec(); // Assuming getMoreRec is an API function to fetch more songs
    //const additionalSongs = moreSongs.slice(0, 5); // Get the next 5 songs
    //visibleSongs.value = [...visibleSongs.value, ...additionalSongs]; // Add them to the visibleSongs array
    showLoadMoreButton.value = false; // Hide "Ver mais" button after loading more
  } catch (error) {
    console.error('Failed to load more songs:', error);
  }
};

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
    router.push('/user/recommendations/playlist');
};

</script>