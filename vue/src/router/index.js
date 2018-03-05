import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Taxonomy from '@/components/Taxonomy'
import Abuse from '@/components/Abuse'
import ArticleCreation from '@/components/ArticleCreation'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Login
    },
    {
      path: '/taxonomy',
      name: 'Taxonomy',
      component: Taxonomy
    },
    {
      path: '/abuse',
      name: 'Abuse',
      component: Abuse
    },
    {
      path: '/article',
      name: 'Article',
      component: ArticleCreation
    }
  ]
})
