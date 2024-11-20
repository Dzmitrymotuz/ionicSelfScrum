<template>
    <ion-page>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"></ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <div id="container" style="text-align: center;">
          <div style="margin: 0 auto">
            <h2>Login</h2>
            <ion-list>
              <ion-item>
                <ion-input aria-label="Email" v-model="email" type="email" placeholder="Enter your email"></ion-input>
              </ion-item>
              <ion-item>
                <ion-input 
                  aria-label="Password" 
                  v-model="password" 
                  type="password"
                  placeholder="Enter your password">
                </ion-input>
              </ion-item>
            </ion-list> 
            <ion-button expand="block" @click="login">Login</ion-button>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  <script>
  import {IonButton, IonContent, IonPage, IonList, IonInput, IonItem, IonTitle, IonHeader, IonToolbar} from "@ionic/vue";
  import axios from '@/utils/connection'
  import storage from '@/utils/storage'
  
  export default {
    components: {
      IonToolbar, IonHeader, IonTitle,
      IonButton, IonContent, IonPage, IonList, IonInput, IonItem
    },
    data() {
      return {
        email: null,
        password: null
      }
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('/login', {
            email: this.email,
            password: this.password,
          })  
          console.log(response.data)

          if (response.data.user) {
            await storage.set('token', response.data.token);
            await storage.set('user', response.data.user);
          } 
          this.$router.push('/about');

          // console.log(response.data)
        } catch (error) {
          console.log('error')
          console.log(error)
          return
        }
      }
    }
  }
  </script>
  