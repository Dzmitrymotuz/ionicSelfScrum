<template>
<ion-page>  
<ion-app> 
    <ion-menu content-id="main-content">
    <ion-header>
        <ion-toolbar>
        <ion-title>Menu Content</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-item router-link="/about" lines="none" :detail="false">
            <ion-label>About</ion-label>
        </ion-item>
        <ion-item router-link="/goals" lines="none" :detail="false">
            <ion-label>Goals</ion-label>
        </ion-item>
        <ion-item router-link="/logout" lines="none" :detail="false">
            <ion-label>Logout</ion-label>
        </ion-item>
    </ion-content>
    </ion-menu>
    <div class="ion-page" id="main-content">
    <ion-header>
        <ion-toolbar>
        <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Menu</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">  
        <ion-router-outlet/>
    </ion-content>
    </div>

</ion-app>
</ion-page>
</template>
  
  <script>
  import {
    IonApp,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonRouterOutlet,
    IonSplitPane,
    IonButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonMenuButton,
    IonPage,
  } from '@ionic/vue';
  
import storage from "@/utils/storage";
import {defineComponent} from 'vue';
  
  export default defineComponent({
    components: {
        IonApp,
        IonContent,
        IonIcon,
        IonItem,
        IonLabel,
        IonList,
        IonListHeader,
        IonMenu,
        IonMenuToggle,
        IonNote,
        IonRouterOutlet,
        IonSplitPane,
        IonButton,
        IonButtons,
        IonTitle,
        IonToolbar,
        IonHeader,
        IonMenuButton,
        IonPage,
    },
    ionViewWillEnter() {
      console.log('load user')
      storage.get('user').then((user) => this.user = user)
    },
    async created() {
    //   console.log('load user - created')
      this.user = await storage.get('user')
    },
    data() {
      return {
        user: null,
      } 
    },

  })
  </script>
  
  
  <style scoped>

  </style>
  