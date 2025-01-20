<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Register</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <ion-grid>
          <ion-row class="ion-justify-content-center">
            <ion-col size-md="6" size-lg="4">
              <ion-card>
                <ion-card-header>
                  <ion-card-title>Create an Account</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <ion-item>
                    <ion-label position="floating">Full Name</ion-label>
                    <ion-input v-model="formData.name" type="text" placeholder="Enter your full name"></ion-input>
                  </ion-item>
  
                  <ion-item>
                    <ion-label position="floating">Email</ion-label>
                    <ion-input v-model="formData.email" type="email" placeholder="Enter your email"></ion-input>
                  </ion-item>
  
                  <ion-item>
                    <ion-label position="floating">Password</ion-label>
                    <ion-input v-model="formData.password" type="" placeholder="Enter your password"></ion-input>
                  </ion-item>
  
                  <ion-item>
                    <ion-label position="floating">Confirm Password</ion-label>
                    <ion-input v-model="formData.password_confirmation" type="" placeholder="Confirm your password"></ion-input>
                  </ion-item>
  
                  <ion-button expand="block" @click="register">
                    Register
                  </ion-button>
                  <ion-text color="danger" v-if="errorMessage">
                    <p>{{ errorMessage }}</p>
                  </ion-text>
                  <ion-text color="success" v-if="successMessage">
                    <p>{{ successMessage }}</p>
                  </ion-text>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { ref } from "vue";
  import { 
    IonButton, 
    IonContent, 
    IonPage, 
    IonInput, 
    IonItem, 
    IonTitle, 
    IonHeader, 
    IonToolbar, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonLabel, 
    IonText 
  } from "@ionic/vue";
  import axios from '@/utils/connection'
  
  export default {
    name: "RegisterPage",
    components: {
      IonButton,
      IonContent,
      IonPage,
      IonInput,
      IonItem,
      IonTitle,
      IonHeader,
      IonToolbar,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardContent,
      IonGrid,
      IonRow,
      IonCol,
      IonLabel,
      IonText,
    },
    setup() {
      const formData = ref({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
  
      const errorMessage = ref("");
      const successMessage = ref("");
  
      const register = async() => {
        errorMessage.value = "";
        successMessage.value = "";
        console.log(formData.value)
        const response = await axios.post('register', formData.value)
        if (response.status === 200) {
            console.log('success')
        }
  
        // Simple validation
        if (!formData.value.name || !formData.value.email || !formData.value.password) {
          errorMessage.value = "All fields are required.";
          return;
        }
        if (formData.value.password !== formData.value.confirmPassword) {
          errorMessage.value = "Passwords do not match.";
          return;
        }
  
        // Simulate registration success
        successMessage.value = "Registration successful!";
        resetForm();
      };
  
      const resetForm = () => {
        formData.value = {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        };
      };
  
      return {
        formData,
        errorMessage,
        successMessage,
        register,
      };
    },
  };
  </script>
  
  <style scoped>
  ion-card {
    margin: 20px auto;
    padding: 10px;
  }
  
  ion-button {
    margin-top: 20px;
  }
  </style>
  