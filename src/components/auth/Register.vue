<template>
  <div class="text-center mb-10">
    <h1 class="font-bold text-3xl text-gray-900">SIGN UP</h1>
    <p>Enter your information to register</p>
  </div>
  <Form @submit="register" :validation-schema="schema" v-slot="{ meta }">
    <div>
      <div class="flex flex-wrap justify-center">
        <figure 
          class="w-28 -mt-4 mb-4 cursor-pointer border-8 hover:border-blue-500 text-center"
          @click="$refs.fileInput.click()"
        >
          <img 
            class="" 
            :src="dpURL" alt="" 
          >
          <figcaption>
            <button class="text-xs rounded-md bg-blue-700 text-white p-1">{{addedImage? 'Change Image' : 'Add Image'}}</button> 
          </figcaption>
        </figure>
          <hr>
        <input hidden type="file" ref="fileInput" name="profile_image" class="" @change="selectImage($event)">
      </div>
      <div class="flex -mx-3">
        <div class="w-1/2 px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1">First name</label>
          <div class="flex flex-wrap">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
            >
              <i class="mdi mdi-account-outline text-gray-400 text-lg"></i>
            </div>
            <Field
              type="text" name="first_name"
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="John"
            />
            <ErrorMessage name="first_name" class="block text-red-500 text-sm" />
          </div>
        </div>
        <div class="w-1/2 px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1">Last name</label>
          <div class="flex flex-wrap">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
            >
              <i class="mdi mdi-account-outline text-gray-400 text-lg"></i>
            </div>
            <Field
              type="text" name="last_name"
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="Smith"
            />
            <ErrorMessage name="last_name" class="block text-red-500 text-sm" />
          </div>
        </div>
      </div>
      <div class="flex -mx-3">
        <div class="w-full px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1">Email</label>
          <div class="flex flex-wrap">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
            >
              <i class="mdi mdi-email-outline text-gray-400 text-lg"></i>
            </div>
            <Field
              type="email" name="email"
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="johnsmith@example.com"
              @change="checkAvailability('email')"
              v-model="email"
            />
            <ErrorMessage name="email" class="block text-red-500 text-sm" />
            <!-- <span v-if="emailTaken" class="block text-red-500 text-sm">This email is already taken</span> -->
          </div>
        </div>
      </div>
      <div class="flex -mx-3">
        <div class="w-full px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1">Phone No.</label>
          <div class="flex flex-wrap">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
            >
              <i class="mdi mdi-cellphone text-gray-400 text-lg"></i>
            </div>
            <Field
              type="text" name="tel"
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="08030000000"
              @change="checkAvailability('tel')"
              v-model="tel"
            />
            <ErrorMessage name="tel" class="block text-red-500 text-sm" />
          </div>
        </div>
      </div>
      <div class="flex -mx-3">
        <div class="w-full px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1">Password</label>
          <div class="flex flex-wrap">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
            >
              <i class="mdi mdi-lock-outline text-gray-400 text-lg"></i>
            </div>
            <Field
              type="password" name="password"
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="************"
            />
            <ErrorMessage name="password" class="block text-red-500 text-sm" />
          </div>
        </div>
      </div>
      <div class="flex -mx-3">
        <div class="w-full px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1"
            >Confirm Password</label
          >
          <div class="flex flex-wrap">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
            >
              <i class="mdi mdi-lock-outline text-gray-400 text-lg"></i>
            </div>
            <Field
              type="password" name="password_confirmation"
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="************"
            />
            <ErrorMessage name="password_confirmation" class="block text-red-500 text-sm" />
          </div>
        </div>
      </div>
      <div class="flex -mx-3">
        <div class="w-1/2 px-3 mb-3">
          <label for="" class="text-xs font-semibold px-1">State</label>
          <div class="flex flex-wrap">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
            >
              <i class="mdi mdi-google-maps text-gray-400 text-lg"></i>
            </div>
            <Field
              type="text" name="state"
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="Your state"
              list="state"
              @change="setLocation()"
              v-model="state"
            />
            <ErrorMessage name="state" class="block text-red-500 text-sm" />
            <datalist id="state">
              <option v-for="state in statesData" :key="state" :value="state.split(':')[0]"></option>
              <!-- <option value="Abia"></option> -->
            </datalist>
          </div>
        </div>
        <div class="w-1/2 px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1">LGA/Place</label>
          <div class="flex flex-wrap">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
            >
              <i class="mdi mdi-location-enter text-gray-400 text-lg"></i>
            </div>
            <Field
              type="text" name="lga"
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="enter lga"
              list="lga"
              v-model="lga"
              @change="setLocation('lga')"
              :disabled = "state == ''"
            />
            <ErrorMessage name="lga" class="block text-red-500 text-sm" />
            <datalist id="lga">
              <option v-for="lga in lgaData" :key="lga" :value="lga.split(':')[0]"></option>
              <!-- <option value="Abia"></option> -->
            </datalist>
          </div>
        </div>
      </div>
      <div class="flex -mx-3">
        <div class="w-full px-3 mb-12">
          <label for="" class="text-xs font-semibold px-1">Gender</label>
          <div class="flex">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
            >
              <i class="mdi mdi-face-outline text-gray-400 text-lg"></i>
            </div>
            <select name="gender"
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              v-model="gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      </div>
      <error-alert v-if="error" :messages = "errorMessages"></error-alert>
      <div class="flex -mx-3">
        <div class="w-full px-3 mb-5">
          <button
            :disabled="loading"
            :class="buttonStyleClass(meta.valid)"
            class="block w-full max-w-xs mx-auto text-white rounded-lg px-3 py-3 font-semibold"
          >
            <span v-if="loading">Signing up <span class="mdi mdi-star mdi-spin text-xl"></span> </span>
            <span v-else class="animate-spin">SIGN UP <span class="mdi mdi-arrow-send-bold mdi-rotate-270" :class="{}"></span> </span>
          </button>
        </div>
      </div>
    </div>
  </Form>
</template>
<script>
import {mapState} from "vuex";
import { Field, Form, ErrorMessage } from 'vee-validate';
import ErrorAlert from "../ErrorAlert.vue";
import * as yup from 'yup';
import store from '../../store';

export default {
    name: "Register",
    components:{
      ErrorAlert,
      Field, 
      Form, 
      ErrorMessage
    },
    data(){
      const schema = yup.object({
        first_name: yup.string().required().min(2),
        last_name: yup.string().required().min(2),
        tel: yup.string().required().min(11).label("Phone number"),
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
        password_confirmation: yup.string().required().min(8),
        gender: yup.string().required().min(4),
        state: yup.string().required().min(2),
        lga: yup.string().required().min(2),
      });
      return{
        schema,
        loading: false,
        statesData: [],
        lgaData: '',
        state: '',
        lga: '',
        email: '',
        tel: '',
        gender: 'female',
        dpURL: require("../../assets/logo.png"),
        addedImage: false,
        error: false,
        errorMessages: [],
        profileImage: null,
        emailTaken: false,
        telTaken: false,
      }
    },
    computed:{
      ...mapState(["states"])
    },
    methods:{
      buttonStyleClass(valid){
        //alert("valid: "+ valid);
        if(this.loading || !valid){
          return{
            'bg-indigo-300  cursor-not-allowed': true
          }
        }
        return {
          'bg-indigo-500 focus:bg-indigo-700 hover:bg-indigo-700': true,
        }
      },
      checkAvailability(fieldName){
        //alert(this[fieldName]);
        console.log(fieldName);
        this.loading = true;
        this.axios.get(process.env.VUE_APP_APIURL+"/check_uniqueness?"+fieldName+"="+this[fieldName]).then((response) => {
          this.loading = false;
          if(response.data == 1){
            this[`${fieldName}Taken`] = true;
          }else{
            this[`${fieldName}Taken`] = false;
          }
          console.log(response.data);
          //setAvailState();
        });
        /* let _this = this;
        function setAvailState(){
          if(_this[`${fieldName}Taken`]){
            console.log(`${fieldName}Taken`);
            _this.$refs.regForm.setFieldError(fieldName, `This ${fieldName} is already taken`);
          }else{
            alert("Not taken");
          }
        } */
      },
      selectImage(e){
        let targetImg=e.target.files[0];
        this.profileImage = {profile_image: targetImg};
        var reader = new FileReader();
        reader.readAsDataURL(targetImg);
        reader.onload = (e)=>{
          this.dpURL = e.target.result;
          this.addedImage = true;
        }
      },
      setLocation(lga = false){
        if(lga){
          //set lga to null if value is not in lga array
          if(!this.lgaData.find(x=> x.split(':')[0] == this.lga))
            this.lga = '';
          console.log(this.lga);
        }else{
          this.lga = '';//set lga to '' when new state is selected
          //set state to null if value is not in state array
          if(!this.statesData.find(x=> x.split(':')[0] == this.state))
            this.state = '';
          console.log(this.state);
          let rawState = this.statesData.find(x=> x.split(':')[0] == this.state);
          this.lgaData = this.states[rawState];
        }
        
      },
      register(values, actions){
        let uniqueFields = ['email', 'tel']
        for(let fieldName of uniqueFields){
          if(this[`${fieldName}Taken`]){
            console.log(fieldName + " taken");
            actions.setFieldError(fieldName, `This ${fieldName.replace('tel', 'Phone number')} is already taken.`);
            return false;
          }
        }
         /*if(this.telTaken){
          console.log("Phone taken");
          actions.setFieldError('tel', 'This phone no is already taken.');
          return false;
        } */
        
        this.loading = true;
        //const form = e.target;
        let formData = new FormData();
        let tempData = this.profileImage? Object.assign({}, values, {gender: this.gender}, this.profileImage) : Object.assign({}, values, {gender: this.gender});
        for(let data in tempData){
          formData.append(data, tempData[data]);
        }
        this.errorMessages = [];
        this.axios.post(process.env.VUE_APP_APIURL+"/register", formData).then(response => {
          console.log('User register response received from server!');
          this.loading = false;
          console.log(response.data);
          if(response.data.status == 1){
            console.log("Registration successful");
            console.log(`Login credentials are: ${values.email} and ${values.password}`);
            //if user registration succeeds, login the user automatically with provided credential and redirect to email verification page
            this.axios.post(process.env.VUE_APP_APIURL+"/login", values).then((response)=>{
              console.log(response.data);
              store.dispatch('login', response.data);
              this.$router.push("/verify_email");
            })
          }
          return false;
          // store.dispatch('login', response.data);
          //this.bearerToken = response.data.access_token;
          // console.log(response.data);
        }).catch(error => {
          console.log(error);
          this.loading = false;
          this.error = true;
          this.errorMessages.push("Sorry, an error occurred on the server. Try again.");
          }); // credentials didn't match
      }
    },
    mounted(){
      for(let state in this.states){
        //this.states.push[state.split(':')[0]];
        //state = state;
        this.statesData.push(state);
        //console.log(state.split(':')[0]);
      }
    }
    
}
</script>