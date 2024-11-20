<template>
<ion-page>
    <ion-content>
    <ion-item >GOALS PAGE</ion-item>
      <!-- today -->
    <div class="dayheader">
        <ion-label @click="load_day('Yesterday')"><</ion-label> 
        <ion-label >{{ dayName }}: {{today}}</ion-label>
        <ion-label @click="load_day('Tomorrow')">></ion-label>
    </div> 
    <ion-list class="category-list"> 
      <ion-item v-for="(categoryData, category) in currentData" :key="category">
        <ion-card class="category-card">
            <div class="category-tab">{{ category }}</div>
            <ion-list>
              <ion-item v-for="goal in categoryData" :key="goal.id">
                <ion-icon :name="goal.status === 1 ? 'checkbox':'checkbox-outline'"
                        :class="goal.status === 1 ? 'blank-text':'normal-text'"
                        @click="changeStatus(goal, category)"
                />
                <ion-label :class="goal.status === 1 ? 'blank-text':'normal-text'" 
                        @click="changeStatus(goal, category)">
                    {{ goal.content }}
                </ion-label>
                <ion-icon 
                :id="`open-action-sheet-${goal.id}`" 
                name="flashy"
                @click="openActionSheet(goal, category)"/> 
                <ion-action-sheet
                :trigger="`open-action-sheet-${goal.id}`"
                header="Actions"
                @didDismiss="actionSheetDismiss"
                :buttons="actionSheetButtons"/>
              </ion-item>
              <ion-item>
                <ion-input 
                v-model="inputValue"
                placeholder="add another goal here"
                />
                <ion-button 
                @click="add_goal(category)">+</ion-button>
              </ion-item> 
            </ion-list>
          </ion-card>
      </ion-item>
    </ion-list>
    </ion-content>
</ion-page>
</template>
  
  <script>
import { ref, onMounted, watch } from 'vue';
import storage from '../utils/storage';
import { IonHeader, IonContent, IonItem, IonIcon, IonInput, IonCard, IonLabel, IonPage, IonList, IonButton, IonActionSheet } from '@ionic/vue';
import { axiosDeleteData, axiosGetDataWithPayload, axiosPostData } from '../utils/connection';
import { addIcons } from "ionicons";
import {checkbox, flash, checkboxOutline, arrowBack} from "ionicons/icons"

  export default {
    components: {
    IonHeader,
    IonContent,
    IonItem,
    IonIcon,
    IonInput,
    IonCard,
    IonLabel,
    IonPage,
    IonList,
    IonButton,
    IonActionSheet,
    },
    setup() {
        let allInitData = ref({})
        let inputValue = ref("")
        let currentData =ref([])
        const todayData = ref([])
        const yesterdayData  = ref([])
        const tomorrowData  = ref([])
        let dayName = ref('Today')
        let selectedGoal = ref ("")
        let categoryRef = ref("")
        const actionSheetButtons = [
            {
                text: 'Delete',
                role: 'destructive',
                data: {
                    action:'delete',
                },
            },
            {
                text: 'Cancel',
                role: 'cancel',
                data: {
                    action: 'cancel',
                },
            }
        ]
        const actionSheetDismiss = (e) =>{
            const {data, role} = e.detail
            if (role === 'backdrop') {
                console.log(role)
            } else if (role === 'cancel') {
                console.log('Cancel')
            } else if (role === 'destructive') {
                deleteGoal()
            }
        }
        const openActionSheet = (goal, category) => {
            selectedGoal = goal
            categoryRef = category
        }
        const deleteGoal = async() => {
            const response = await axiosDeleteData(`${categoryRef}/delete/${selectedGoal}`)
            allInitData[dayName.value.toLowerCase()][categoryRef]=allInitData[dayName.value.toLowerCase()][categoryRef].filter((goal)=>goal.id !== selectedGoal.id)
            if (dayName.value === "Today") {
                currentData.value = { ...allInitData.today }; 
            } else if (dayName.value === "Yesterday") {
                currentData.value = { ...allInitData.yesterday };
            } else if (dayName.value === "Tomorrow") {
                currentData.value = { ...allInitData.tomorrow };
            }

            console.log("Updated currentData:", currentData.value);
        }
        const formatDate = (date) => {
            // Format the date as 'mm-dd-yyyy'
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
        }; 
        let today = formatDate(new Date());
        const tomorrow = formatDate(new Date(new Date().setDate(new Date().getDate()+1)))
        const yesterday = formatDate(new Date(new Date().setDate(new Date().getDate()-1)))

        const fetchDailyData = async() => {
            const data = await axiosGetDataWithPayload('dayload', {yesterday, today, tomorrow});
            allInitData = data
            yesterdayData.value  = data.yesterday
            todayData.value  = data.today
            tomorrowData.value  = data.tomorrow
            currentData.value = data.today
            // console.log(todayData.value)
        }
        onMounted(()=> {  
            fetchDailyData();
            addIcons({
                checkbox:checkbox,
                flashy:flash,
                checkboxOutline:checkboxOutline,
                arrowBack:arrowBack,
            })
        });
        const changeStatus = async (goal, category) => {
            let status;
            goal.status === 1 ? status = 0 : status = 1; 
            const response = await axiosPostData(`${category}/status-change`, {
                status: status,
                id: goal.id
            });
            goal.status = status;
        }
        const load_day = (name) => {
            if (dayName.value === 'Today' & name==='Tomorrow') {
                dayName.value = name
                currentData.value = tomorrowData.value
            }else if (dayName.value === 'Tomorrow' & name==='Tomorrow'){
                console.log('Day afetr tomorrow data will be loaded here...')
            }else if (dayName.value === 'Tomorrow' & name==='Yesterday'){
                currentData.value = todayData.value
                dayName.value = 'Today'
            }else if (dayName.value === 'Today' & name==='Yesterday'){
                dayName.value = name
                currentData.value = yesterdayData.value
            }else if (dayName.value === 'Yesterday' & name==='Yesterday'){
                console.log('Day before yesterday data will be loaded here...')
            }else if (dayName.value === 'Yesterday' & name==='Tomorrow'){
                currentData.value = todayData.value
                dayName.value = 'Today'
            } 
        }
        const add_goal = async(category) => {
            if (inputValue.value.length <= 0) {
                return console.log('Mistake')
            }
            let date 
            if (dayName.value === "Today") {
                date = today
            }else if (dayName.value === "Yesterday") {
                date = yesterday
            } else {
                date = tomorrow
            }
            
            const response = await axiosPostData(`${category}/add-goal`, {
                category: category,
                goal: inputValue.value,
                status: 0,
                date: date,
            })
            inputValue.value = ""
            // PROBLEM that it will rerender components wrong on yesterday/tomorrow
            fetchDailyData()
        }

        return {
            allInitData,
            currentData,
            today,
            tomorrow, 
            yesterday,
            yesterdayData,
            todayData,
            tomorrowData,
            changeStatus,
            load_day,
            add_goal,
            dayName,
            inputValue,
            actionSheetButtons,
            actionSheetDismiss,
            openActionSheet,
            selectedGoal,
            deleteGoal,
            categoryRef
        }
    }
}
  </script>
  
<style scoped>
.category-list {
    margin-top: 10px;
}
.category-card {
    width: 100%;
}
.category-tab{
    background: #343239;
    padding: 5px;
    color: #dadada;
}
::v-deep(.blank-text){
    opacity: 40%;
}
::v-deep(.normal-text){
    opacity: 100%;
}
.dayheader{
    padding: 5px;
    margin: 10px;
    color: white;
    background: black;
    border-radius: 5px;
    opacity: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0px 20px 0px 20px;
    padding: 5px;  
}
ion-action-sheet {
  --backdrop-opacity: 0.4; /* Adjust to desired transparency */
}

</style>
  