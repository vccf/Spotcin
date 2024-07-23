// apiService.ts

import axios from 'axios';
import * as $ from 'jquery';

export function useApiService() {
  const baseUrl = 'http://localhost:5001/api'; // Replace with your API URL

  async function fetchData() {
    try {
      const response = await axios.get(`${baseUrl}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async function postUser(data: any) {
    const endpoint = `${baseUrl}/users`;
    try {
      const response = await axios.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  }

  async function loginUser(data:any){
    const endpoint = `${baseUrl}/login`;
    try {
      const response = await axios.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  }

  async function getRecommendations(data: any) {
    const endpoint = `${baseUrl}/user/recommendations/playlist`;
    try {
      const response = await axios.post(endpoint, data);
      return response.data;
    }catch (error){
      console.error('Error:', error);
      throw error;
    }
  }

  async function getSong(){
    const endpoint = `${baseUrl}/user/recommendations/playlist`;
    try {
      const response = await axios.get(endpoint);
      return response.data;
    }catch (error){
      console.error('Error:', error);
      throw error;
    }
  }

  async function deleteSong(data: any) {
    const endpoint = `${baseUrl}/user/recommendations/playlist/${data.id}`;
    try {
      const response = await axios.post(endpoint, data);
      return response.data;
    }catch (error){
      console.error('Error:', error);
      throw error;
    }
  }
  
  async function getMoreRecommendations (data: any){
    const endpoint = `${baseUrl}/user/recommendations/playlist-recommendations`;
    try {
      const response = await axios.post(endpoint, data);
      return response.data;
    }catch (error){
      console.error('Error:', error);
      throw error;
    }
  }
  
  async function getHistoryRecommendations (data: any){
    const endpoint = `${baseUrl}/user/recommendations/history-recommendations`;
    try {
      const response = await axios.post(endpoint, data); 
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  async function deleteSongFromPlaylist (data: any) {
    const endpoint = `${baseUrl}/user/recommendations/playlist/songId`;
    try {
      const response = await axios.delete(endpoint);
      console.log('Song deleted from playlist successfully');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    fetchData,
    postUser,
    loginUser,
    getRecommendations,
    deleteSong,
    getMoreRecommendations,
    getHistoryRecommendations, 
    deleteSongFromPlaylist
  };
}
