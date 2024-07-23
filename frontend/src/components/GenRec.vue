<template>
    
</template>

<script setup lang="ts">
import 'core-js/features/array/flat-map';

//genres and tags associated with songs to recommend new songs based on a user's listening history and feedback.
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

const allSongs: Song[] = [
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
    { id: 25, name: 'Dead as Dreams', artist: 'Weakling', genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "melancholic", "winter", "atmospheric"]},
    { id: 26, name: 'Neither Meaning nor Justice', artist: 'Deathspell Omega', genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
    { id: 27, name: 'Chorea Macchabeorum', artist: 'Blut aus Nord', genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter", "atmospheric"]},
    { id: 28, name: 'Maze of Phobetor', artist: 'Akhlys', genre: "Black Metal", tags: ["dark", "heavy", "chaotic", "concept", "hypnotic"]},
    { id: 29, name: 'Exercises in Futility V', artist: 'Mgla', genre: "Black Metal", tags: ["dark", "heavy", "aggressive", "winter", "atmospheric"]},
    { id: 30, name: 'A Fine Day to Die', artist: 'Bathory', genre: "Black Metal", tags: ["aggressive", "heavy", "dark", "pagan"]},
];

const user: User = {
    id: 1,
    name: "Viktoria",
    listenedSongs: [allSongs[2], allSongs[3], allSongs[16], allSongs [22], allSongs[23]] //user listened at least 5 songs
};

let feedbacks: Feedback[] = [];

const recSongs = allSongs.filter(song => !user.listenedSongs.includes(song));

const recSongsExpanded; 

function generateRecommendations2(user: User): Song[] {
    const listenedGenres = user.listenedSongs.map(song => song.genre);
    //const listenedTags = user.listenedSongs.flatMap(song => song.tags);
    const listenedTags = user.listenedSongs
    .map(song => song.tags)
    .reduce((acc, tags) => acc.concat(tags), []);

    // Filter songs based on common genres and tags
    const recommendedSongs = songs.filter(song =>
        listenedGenres.includes(song.genre) || song.tags.some(tag => listenedTags.includes(tag))
    );

    // Exclude already listened songs
    const filteredRecommendations = recommendedSongs.filter(song =>
        !user.listenedSongs.some(listenedSong => listenedSong.id === song.id)
    );

    // Return top 10 recommended songs (you can implement ranking logic)
    return filteredRecommendations.slice(0, 10);
}

const recommendedSongs2 = generateRecommendations(user);

console.log("Recommended Songs:");
console.log(recommendedSongs2);

/*generateRecommendations function calculates recommendations based on:
listenedGenres: Genres of songs the user has listened to.
listenedTags: Tags associated with songs the user has listened to.
It filters songs to include those with genres or tags that match the user's listening history.
It excludes songs that the user has already listened to (user.listenedSongs).*/

function generateRecommendations(user: User): Song[] {
    const listenedGenres = user.listenedSongs.map(song => song.genre);
    //const listenedTags = user.listenedSongs.flatMap(song => song.tags);
    const listenedTags = user.listenedSongs
    .map(song => song.tags)
    .reduce((acc, tags) => acc.concat(tags), []);

    // Filter songs based on common genres and tags
    let recommendedSongs = songs.filter(song =>
        listenedGenres.includes(song.genre) || song.tags.some(tag => listenedTags.includes(tag))
    );

    // Exclude already listened songs
    recommendedSongs = recommendedSongs.filter(song =>
        !user.listenedSongs.some(listenedSong => listenedSong.id === song.id)
    );

    // Exclude disliked songs based on user feedback
    recommendedSongs = recommendedSongs.filter(song =>
        !feedbacks.some(feedback => feedback.songId === song.id && !feedback.liked)
    );

    // Return top 10 recommended songs (you can implement ranking logic)
    return recommendedSongs.slice(0, 10);
}

function handleSongFeedback(songId: number, liked: boolean): void {
    const existingFeedback = feedbacks.find(feedback => feedback.songId === songId);

    if (existingFeedback) {
        existingFeedback.liked = liked;
    } else {
        feedbacks.push({ songId, liked });
    }
}

const recommendedSongs = generateRecommendations(user);

console.log("Recommended Songs:");
console.log(recommendedSongs);

// user dislikes song with id 3
handleSongFeedback(3, false);

// Regenerate recommendations considering updated feedback
const updatedRecommendedSongs = generateRecommendations(user);

console.log("Updated Recommended Songs:");
console.log(updatedRecommendedSongs);

/*
Feedback interface includes songId and liked to record 
whether the user liked or disliked a song.
handleSongFeedback function manages user feedback, updating existing feedback or adding new feedback entries.

generateRecommendations function filters songs based on user history (genres and tags), 
excludes songs already listened to, and considers user feedback to exclude disliked songs.

Missing: Database, User Interface
*/

</script>

<style scoped>
button {
    background-color: plum;
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
</style>