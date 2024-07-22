import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import MainPage from '../views/MainPage.vue'
import PlaylistsView from '../views/PlaylistsView.vue'
import ToDoView from '../views/ToDoView.vue'
import RecommendationsView from '../views/RecommendationsView.vue'
import HistoryRecommendationsView from '../views/HistoryRecommendationsView.vue'
import PlaylistRecommendationsView from '../views/PlaylistRecommendationsView.vue'
import MoreRecommendationsView from '../views/MoreRecommendationsView.vue'
import DeletedRecommendationView from '../views/DeletedRecommendationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL as string),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ToDoView
    },
    { path: '/login',
      name: 'login',
      component: LoginView
    },
    { path: '/cadastro',
      name: 'cadastro',
      component: CadastroView
    },
    {
      path: '/playlists',
      name: "playlists",
      component: PlaylistsView
    },
    {
      path: '/recommendations',
      name: 'recommendations',
      component: RecommendationsView
    },
    {
      path: '/recommendations/playlist',
      name: 'playlist-recommendations',
      component: PlaylistRecommendationsView
    },
    {
      path: '/recommendations/history',
      name: 'history-recommendations',
      component: HistoryRecommendationsView
    },
    {
      path: '/recommendations/playlist/more',
      name: 'more-recommendations',
      component: MoreRecommendationsView
    },
    {
      path: '/recommendations/playlist/:song',
      name: 'one-deleted-recommendations',
      component: DeletedRecommendationView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
