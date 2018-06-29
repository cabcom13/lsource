import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import managetyps from '@/components/managetyps'
import addsource from '@/components/addsource'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/managetyps',
      name: 'managetyps',
      component: managetyps
    },
    {
      path: '/addsource',
      name: 'addsource',
      component: addsource
    },   
  ]
})
