import { createRouter, createWebHistory } from '@ionic/vue-router';
import storage from '@/utils/storage';
const routes = [
  {
    path: '/',
    redirect: '/home' 
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import ("../pages/Auth/Login.vue")
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import ("../pages/Auth/Logout.vue")
  },
  {
    path: '/menu',
    component: () => import ('../pages/Menu.vue'),
    children: [
      {
        path: '/about',
        name: 'About',
        component: () =>  import ("../pages/About.vue")
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import ("../pages/Home.vue")
      },
      {
        path: '/goals',
        name: 'Goals',
        component: () =>  import ("../pages/Goals.vue")
    },
    ],
    name: 'Menu',
    },
    
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach(async(to, from)=> {
  const token = await storage.get('token');
  if (!token && to.name != 'Login') {
    return {name: 'Login'}
  }
  return true;
})

export default router
