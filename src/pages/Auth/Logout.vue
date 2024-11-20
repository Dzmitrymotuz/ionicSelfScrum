<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container" style="text-align: center;">
        <div style="margin: 0 auto">
          <h2>Logout</h2>
          <p>We are logging you out, you will be redirected once complete.</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import {IonButton, IonContent, IonPage, IonList, IonInput, IonItem} from "@ionic/vue";
import axios from '@/utils/connection'
import storage from '@/utils/storage'

export default {
  components: {
    IonButton, IonContent, IonPage, IonList, IonInput, IonItem
  },
  async created() {
    try {
      const token = await storage.get('token');
      console.log('token', token)
      let response = await axios.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`  // Attach the token to the logout request
        }
      });
      if ( response.data ) {
        await storage.remove('token');
        await storage.remove('user');
        this.$router.push('/login');
      }

      console.log(response.data)
    } catch (error) {
      console.log(error)
      return
    }
  }
}
</script>
