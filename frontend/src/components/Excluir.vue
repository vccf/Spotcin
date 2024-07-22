<template>
    <div>
        <h1>Excluir</h1>
        <p>Tem certeza que deseja excluir?</p>
        <ul>
            <li v-for="song in songs" :key="song.id">
                <div>
                  {{ song.name }} - {{ song.artist }}
                  <button @click="deleteSong(song.id)">Excluir</button>
                </div>
            </li>
        </ul>
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
import { useRouter} from 'vue-router';
const router = useRouter();

interface Song {
    id: number;
    name: string;
    artist: string;
    genre: string;
    tags: string[];   
}

interface User {
    id: number;
    name: string;
    listenedSongs: Song[];
}

interface Feedback {
    songId: number;
    liked: boolean; // Whether the user liked (true) or disliked (false) the song
}

const songs = ref([
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

const user: User = {
    id: 1,
    name: "Viktoria",
    listenedSongs: [songs[2], songs[3], songs[16], songs [22], songs[23]] //user listened at least 5 songs
};

const deleteSong = (songId) => {
    songs.value = songs.value.filter(song => song.id !== songId);
    reloadRecommendationPlaylist(); //reload the page
};
      
const reloadRecommendationPlaylist = () => {
    router.push('/user/recommendations/playlist');
};

</script>