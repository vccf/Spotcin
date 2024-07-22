<template>
    <div>
        <h1>Recommendations</h1>
        <button @click="viewRecentRecommendations">Ver recomendações mais recentes</button>
        <button @click="generateRecommendationPlaylist">Gerar playlist de recomendações</button>
        <button @click="viewRecommendationHistory">Ver histórico de recomendações</button>
        <button @click="viewMoreRecommendations">Ver mais recomendações</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const viewRecentRecommendations = () => {
    router.push('/recommendations/playlist');
};

const generateRecommendationPlaylist = () => {
    router.push('/recommendations/playlist');
};

const viewRecommendationHistory = () => {
    router.push('/recommendations/history');
};

const viewMoreRecommendations = () => {
    router.push('/recommendations/playlist/more');
};

</script>

<style scoped>
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    button {
        background-color: plum;
        color: black;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }

    button:hover {
        opacity: 0.8;
    }

    button:active {
        background-color: plum;
        opacity: 0.8;
    }

    button:focus {
        outline: none;
    }
</style>

