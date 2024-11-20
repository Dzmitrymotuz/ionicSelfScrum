<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>About</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <button @click="storagecheck">storage</button>
        <h2>About This App</h2>
        <p>This application is designed to provide users with an exceptional experience. Learn more about its features below.</p>
  
        <ion-list>
          <ion-item>
            <ion-label>
              <h3>Feature 1</h3>
              <p>Description of feature 1.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              <h3>Feature 2</h3>
              <p>Description of feature 2.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              <h3>Feature 3</h3>
              <p>Description of feature 3.</p>
            </ion-label>
          </ion-item>
        </ion-list>
  
        <ion-button expand="block">Back to Home</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import storage from '@/utils/storage';

  
  export default defineComponent({
    name: 'AboutPage',
    components: {
      IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton
    },
    methods: {
      async storagecheck(){
        console.log(await storage.get('token'));
      },
    }
  });
  </script>
  
  <style scoped>
  h2 {
    text-align: center;
    margin-bottom: 16px;
  }
  </style>
  