<script setup lang="ts">
    import { ref } from 'vue';

    // Variáveis reativas para controlar o estado do pop-up e armazenar informações da playlist
    const showPopup = ref(false);
    const playlistName = ref('');
    const playlistDescription = ref('');

    // Função para salvar a playlist
    const savePlaylist = () => {
    console.log('Nome:', playlistName.value);
    console.log('Descrição:', playlistDescription.value);

    // Fechar o pop-up após salvar
    showPopup.value = false;
    };

</script>


<template>

    <div class="buttons_area">
      <h1>Minhas playlists</h1>
      <div class="buttons">
        <button class="btn" @click="showPopup = true">Criar playlist</button>  <!-- Pop-up aparece -->
        <RouterLink to="/recommendations"><button class="btn">Categorias</button></RouterLink> <!-- Linkar com a view da pagina de categorias -->
      </div>
    </div>

    <!-- Pop-up -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup">
        <h2>Criar Playlist</h2>
        <label for="playlist-name">Nome:</label>
        <input type="text" id="playlist-name" v-model="playlistName" />

        <label for="playlist-description">Descrição:</label>
        <textarea id="playlist-description" v-model="playlistDescription"></textarea>

        <button @click="savePlaylist">Salvar</button>
        <button @click="showPopup = false">Cancelar</button>
      </div>
    </div>



    <div class="playlists-area">
      <!-- Colocar forma de criar as playlists -->
    </div>
  

</template>



<style scoped>


/* ////////////////// Área de cima ////////////////////// */
    .buttons_area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: white; /* Cor de fundo opcional para o contêiner dos botões */
    }

    h1 {
    margin: 0;
    }

    .buttons {
    display: flex;
    gap: 20px; /* Espaçamento entre os botões */
    }

    .btn {
    background-color: grey; /* Fundo cinza no botão */
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    }

    .btn:hover {
    background-color: white; /* Cor de fundo ao passar o mouse */
    }

/* ////////////////// Área de do pop-up ////////////////////// */
/* Estilos para o pop-up */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Sobreposição escura */
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  background-color: plum;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.popup h2 {
  margin-top: 0;
}

.popup label {
  display: block;
  margin-top: 10px;
}

.popup input, .popup textarea {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid white;
  border-radius: 4px;
}

.popup button {
  margin-top: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popup button:first-of-type {
  background-color: green; /* Cor verde para salvar */
  color: white;
}

.popup button:first-of-type:hover {
  background-color: green; /* Cor verde escuro ao passar o mouse */
}

.popup button:last-of-type {
  background-color: red; /* Cor vermelha para cancelar */
  color: white;
  margin-left: 10px;
}

.popup button:last-of-type:hover {
  background-color: red; /* Cor vermelha escura ao passar o mouse */
}


/* ////////////////// Área das playlists ////////////////////// */
    .playlists-area{
    background-color: plum;
    padding: 8px;
    margin: 8px;
    min-height: calc(85vh); /* Espaço vazio, pode gerar problemas */
    color: white; /* Cor do texto para contraste, se houver conteúdo */
    }

</style>