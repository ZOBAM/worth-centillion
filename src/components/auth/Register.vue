<template>
  <div v-if="!isEditing" class="tw-text-center tw-mb-10">
    <h1 class="tw-font-bold tw-text-3xl tw-text-gray-900">SIGN UP</h1>
    <p>Enter your information to register</p>
  </div>
  <div v-else class="tw-text-center tw-mb-10">
    <h1 class="tw-font-bold tw-text-3xl tw-text-gray-900">UPDATE DETAILS</h1>
    <p>Make changes and save</p>
  </div>
  <Form @submit="register" :validation-schema="schema" v-slot="{ meta }">
    <div>
      <div class="tw-flex tw-flex-wrap tw-justify-center">
        <figure
          class="tw-w-28 -mt-4 tw-mb-4 tw-cursor-pointer tw-border-8 hover:tw-border-blue-500 tw-text-center"
          @click="$refs.fileInput.click()"
        >
          <img class="" :src="dpURL" alt="" />
          <figcaption>
            <button
              type="button"
              v-if="!readOnly"
              class="tw-text-xs tw-rounded-md tw-bg-blue-700 tw-text-white p-1"
            >
              <template v-if="isEditing">Change Image</template>
              <template v-else>
                {{ addedImage ? "Change Image" : "Add Image" }}
              </template>
            </button>
          </figcaption>
        </figure>
        <hr />
        <input
          hidden
          type="file"
          ref="fileInput"
          name="profile_image"
          class=""
          @change="selectImage($event)"
        />
      </div>
      <div class="tw-flex -tw-mx-3">
        <div class="tw-w-1/2 tw-px-3 tw-mb-5">
          <label for="" class="tw-text-xs tw-font-semibold tw-px-1"
            >First name</label
          >
          <div class="tw-flex tw-flex-wrap">
            <div
              class="tw-relative tw-w-full tw-flex tw-items-center tw-justify-center"
            >
              <i
                class="mdi mdi-account-outline tw-absolute block tw-left-0 -tw-ml-10 tw-w-10 tw-pl-1 tw-text-center pointer-events-none"
              ></i>

              <Field
                type="text"
                name="first_name"
                v-model="firstName"
                class="tw-w-full -tw-ml-10 tw-pl-10 tw-pr-3 tw-py-2 tw-rounded-lg tw-border-2 tw-border-gray-200 tw-outline-none focus:tw-border-indigo-500"
                placeholder="Your first name"
                :disabled="readOnly"
              />
            </div>
            <ErrorMessage
              name="first_name"
              class="tw-block tw-text-red-500 tw-text-sm"
            />
          </div>
        </div>
        <div class="tw-w-1/2 tw-px-3 tw-mb-5">
          <label for="" class="tw-text-xs tw-font-semibold tw-px-1"
            >Last name</label
          >
          <div class="tw-flex tw-flex-wrap">
            <div
              class="tw-relative tw-w-full tw-flex tw-items-center tw-justify-center"
            >
              <i
                class="mdi mdi-account-outline tw-absolute block tw-left-0 -tw-ml-10 tw-w-10 tw-pl-1 tw-text-center pointer-events-none"
              ></i>

              <Field
                type="text"
                name="last_name"
                v-model="lastName"
                class="tw-w-full -tw-ml-10 tw-pl-10 tw-pr-3 tw-py-2 tw-rounded-lg tw-border-2 tw-border-gray-200 tw-outline-none focus:tw-border-indigo-500"
                placeholder="Your last name"
                :disabled="readOnly"
              />
            </div>
            <ErrorMessage
              name="last_name"
              class="tw-block tw-text-red-500 tw-text-sm"
            />
          </div>
        </div>
      </div>
      <div class="tw-flex -tw-mx-3">
        <div class="tw-w-full tw-px-3 tw-mb-5">
          <label for="" class="tw-text-xs tw-font-semibold tw-px-1"
            >Phone No.</label
          >
          <div class="tw-flex tw-flex-wrap">
            <div
              class="tw-relative tw-w-full tw-flex tw-items-center tw-justify-center"
            >
              <i
                class="mdi mdi-cellphone tw-absolute block tw-left-0 -tw-ml-10 tw-w-10 tw-pl-1 tw-text-center pointer-events-none"
              ></i>

              <Field
                type="text"
                name="tel"
                class="tw-w-full -tw-ml-10 tw-pl-10 tw-pr-3 tw-py-2 tw-rounded-lg tw-border-2 tw-border-gray-200 tw-outline-none focus:tw-border-indigo-500"
                placeholder="Enter phone no"
                @change="checkAvailability('tel')"
                v-model="tel"
                :disabled="readOnly"
              />
            </div>
            <ErrorMessage
              name="tel"
              class="tw-block tw-text-red-500 tw-text-sm"
            />
          </div>
        </div>
      </div>
      <template v-if="!isEditing">
        <div class="tw-flex -tw-mx-3">
          <div class="tw-w-full tw-px-3 tw-mb-5">
            <label for="" class="tw-text-xs tw-font-semibold tw-px-1"
              >Password</label
            >
            <div class="tw-flex tw-flex-wrap">
              <div
                class="tw-relative tw-w-full tw-flex tw-items-center tw-justify-center"
              >
                <i
                  class="mdi mdi-lock-outline tw-absolute block tw-left-0 -tw-ml-10 tw-w-10 tw-pl-1 tw-text-center pointer-events-none"
                ></i>

                <Field
                  type="password"
                  name="password"
                  class="tw-w-full -tw-ml-10 tw-pl-10 tw-pr-3 tw-py-2 tw-rounded-lg tw-border-2 tw-border-gray-200 tw-outline-none focus:tw-border-indigo-500"
                  placeholder="************"
                />
              </div>
              <ErrorMessage
                name="password"
                class="tw-block tw-text-red-500 tw-text-sm"
              />
            </div>
          </div>
        </div>
        <div class="tw-flex -tw-mx-3">
          <div class="tw-w-full tw-px-3 tw-mb-5">
            <label for="" class="tw-text-xs tw-font-semibold tw-px-1"
              >Confirm Password</label
            >
            <div class="tw-flex tw-flex-wrap">
              <div
                class="tw-relative tw-w-full tw-flex tw-items-center tw-justify-center"
              >
                <i
                  class="mdi mdi-lock-outline tw-absolute block tw-left-0 -tw-ml-10 tw-w-10 tw-pl-1 tw-text-center pointer-events-none"
                ></i>

                <Field
                  type="password"
                  name="password_confirmation"
                  class="tw-w-full -tw-ml-10 tw-pl-10 tw-pr-3 tw-py-2 tw-rounded-lg tw-border-2 tw-border-gray-200 tw-outline-none focus:tw-border-indigo-500"
                  placeholder="************"
                />
              </div>
              <ErrorMessage
                name="password_confirmation"
                class="tw-block tw-text-red-500 tw-text-sm"
              />
            </div>
          </div>
        </div>
      </template>
      <div class="tw-flex -tw-mx-3">
        <div class="tw-w-1/2 tw-px-3 tw-mb-3">
          <label for="" class="tw-text-xs tw-font-semibold tw-px-1"
            >State</label
          >
          <div class="tw-flex tw-flex-wrap">
            <div
              class="tw-relative tw-w-full tw-flex tw-items-center tw-justify-center"
            >
              <i
                class="mdi mdi-google-maps tw-absolute block tw-left-0 -tw-ml-10 tw-w-10 tw-pl-1 tw-text-center pointer-events-none"
              ></i>

              <Field
                type="text"
                name="state"
                class="tw-w-full -tw-ml-10 tw-pl-10 tw-pr-3 tw-py-2 tw-rounded-lg tw-border-2 tw-border-gray-200 tw-outline-none focus:tw-border-indigo-500"
                placeholder="Your state"
                list="state"
                @change="setLocation()"
                v-model="state"
                :disabled="readOnly"
              />
            </div>
            <ErrorMessage
              name="state"
              class="tw-block tw-text-red-500 tw-text-sm"
            />
            <datalist id="state">
              <option
                v-for="state in statesData"
                :key="state"
                :value="state.split(':')[0]"
              ></option>
              <!-- <option value="Abia"></option> -->
            </datalist>
          </div>
        </div>
        <div class="tw-w-1/2 tw-px-3 tw-mb-5">
          <label for="" class="tw-text-xs tw-font-semibold tw-px-1"
            >LGA/Place</label
          >
          <div class="tw-flex tw-flex-wrap">
            <div
              class="tw-relative tw-w-full tw-flex tw-items-center tw-justify-center"
            >
              <i
                class="mdi mdi-location-enter tw-absolute block tw-left-0 -tw-ml-10 tw-w-10 tw-pl-1 tw-text-center pointer-events-none"
              ></i>

              <Field
                type="text"
                name="lga"
                class="tw-w-full -tw-ml-10 tw-pl-10 tw-pr-3 tw-py-2 tw-rounded-lg tw-border-2 tw-border-gray-200 tw-outline-none focus:tw-border-indigo-500"
                placeholder="enter lga"
                list="lga"
                v-model="lga"
                @change="setLocation('lga')"
                :disabled="state == '' || readOnly"
              />
            </div>
            <ErrorMessage
              name="lga"
              class="tw-block tw-text-red-500 tw-text-sm"
            />
            <datalist id="lga">
              <option
                v-for="lga in lgaData"
                :key="lga"
                :value="lga.split(':')[0]"
              ></option>
              <!-- <option value="Abia"></option> -->
            </datalist>
          </div>
        </div>
      </div>
      <div v-if="!isEditing" class="tw-flex -tw-mx-3">
        <div class="tw-w-full tw-px-3 tw-mb-12">
          <label for="" class="tw-text-xs tw-font-semibold tw-px-1"
            >Gender</label
          >
          <div class="tw-flex">
            <p>
              <label>
                <input
                  name="gender"
                  type="radio"
                  value="male"
                  v-model="gender"
                  checked
                />
                <span>Male</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  name="gender"
                  value="female"
                  type="radio"
                  v-model="gender"
                />
                <span>Female</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <error-alert v-if="error" :messages="errorMessages"></error-alert>
      <div class="tw-flex -tw-mx-3">
        <div class="tw-w-full tw-px-3 tw-mb-5">
          <button
            :disabled="loading"
            v-if="!readOnly"
            :class="buttonStyleClass(meta.valid)"
            class="block tw-w-full max-w-xs tw-mx-auto tw-text-white tw-rounded-lg tw-px-3 tw-py-3 tw-font-semibold"
          >
            <span v-if="loading">
              {{ isEditing ? "Updating" : "Signing up" }}
              <span class="mdi mdi-star mdi-spin tw-text-xl"></span>
            </span>
            <span v-else class="animate-spin"
              >{{ isEditing ? "SAVE CHANGES" : "SIGN UP" }}
              <span
                class="mdi mdi-arrow-send-bold mdi-rotate-270"
                :class="{}"
              ></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </Form>
</template>
<script>
import { mapState } from "vuex";
import { Field, Form, ErrorMessage } from "vee-validate";
import ErrorAlert from "../ErrorAlert.vue";
import * as yup from "yup";
import store from "../../store";
import M from "materialize-css";

export default {
  name: "Register",
  props: ["isEditing", "readOnly"],
  components: {
    ErrorAlert,
    Field,
    Form,
    ErrorMessage,
  },
  emits: ["updated"],
  data() {
    const schema = yup.object({
      first_name: yup
        .string()
        .required()
        .min(2),
      last_name: yup
        .string()
        .required()
        .min(2),
      tel: yup
        .string()
        .required()
        .matches(
          /^[+]?(234)?0?[7-9][0-1][0-9]{8}$/,
          "Phone number format is not valid"
        )
        .label("Phone number"),
      /* email: yup
        .string()
        .required()
        .email(), */
      password: yup
        .string()
        .required()
        .min(8),
      password_confirmation: yup
        .string()
        .required()
        .min(8),
      gender: yup
        .string()
        .required()
        .min(4),
      state: yup
        .string()
        .required()
        .min(2),
      lga: yup
        .string()
        .required()
        .min(2),
    });
    return {
      schema,
      loading: false,
      statesData: [],
      lgaData: "",
      firstName: "",
      lastName: "",
      state: "",
      lga: "",
      tel: "",
      gender: "female",
      dpURL: require("../../assets/logo.png"),
      addedImage: false,
      error: false,
      errorMessages: [],
      profileImage: null,
      emailTaken: false,
      telTaken: false,
    };
  },
  computed: {
    ...mapState(["states", "user"]),
  },
  methods: {
    buttonStyleClass(valid) {
      //alert("valid: "+ valid);
      if (this.loading || !valid) {
        return {
          "tw-bg-indigo-300  tw-cursor-not-allowed": true,
        };
      }
      return {
        "tw-bg-indigo-500 focus:bg-indigo-700 hover:bg-indigo-700": true,
      };
    },
    checkAvailability(fieldName) {
      //alert(this[fieldName]);
      //console.log(fieldName);
      this.loading = true;
      this.axios
        .get(
          process.env.VUE_APP_APIURL +
            "/check_uniqueness?" +
            fieldName +
            "=" +
            this[fieldName]
        )
        .then((response) => {
          this.loading = false;
          if (response.data == 1) {
            this[`${fieldName}Taken`] = true;
          } else {
            this[`${fieldName}Taken`] = false;
          }
          console.log(response.data);
          //setAvailState();
        });
    },
    selectImage(e) {
      let targetImg = e.target.files[0];
      this.profileImage = { profile_image: targetImg };
      var reader = new FileReader();
      reader.readAsDataURL(targetImg);
      reader.onload = (e) => {
        this.dpURL = e.target.result;
        this.addedImage = true;
      };
    },
    setLocation(lga = false) {
      if (lga) {
        //set lga to null if value is not in lga array
        if (!this.lgaData.find((x) => x.split(":")[0] == this.lga))
          this.lga = "";
        console.log(this.lga);
      } else {
        this.lga = ""; //set lga to '' when new state is selected
        //set state to null if value is not in state array
        if (!this.statesData.find((x) => x.split(":")[0] == this.state))
          this.state = "";
        console.log(this.state);
        let rawState = this.statesData.find(
          (x) => x.split(":")[0] == this.state
        );
        this.lgaData = this.states[rawState];
      }
    },
    register(values, actions) {
      let uniqueFields = ["email", "tel"];
      for (let fieldName of uniqueFields) {
        if (this[`${fieldName}Taken`]) {
          console.log(fieldName + " taken");
          actions.setFieldError(
            fieldName,
            `This ${fieldName.replace("tel", "Phone number")} is already taken.`
          );
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
      let tempData = this.profileImage
        ? Object.assign({}, values, { gender: this.gender }, this.profileImage)
        : Object.assign({}, values, { gender: this.gender });
      for (let data in tempData) {
        formData.append(data, tempData[data]);
      }
      if (this.isEditing) {
        formData.append("user_id", this.user.id);
      }
      this.errorMessages = [];
      this.axios
        .post(process.env.VUE_APP_APIURL + "/register", formData)
        .then((response) => {
          //console.log("User register response received from server!");
          this.loading = false;
          //console.log(response.data);
          if (response.data.status.status == 1) {
            //registration successful
            //console.log("Registration successful");
            //console.log(`Login credentials are: ${values.email} and ${values.password}`);
            //if user registration succeeds, login the user automatically with provided credential and redirect to email verification page
            this.axios
              .post(process.env.VUE_APP_APIURL + "/login", values)
              .then((response) => {
                //console.log(response.data);
                store.dispatch("login", response.data);
                this.$router.push("/verify/tel");
              });
          } else if (response.data.status == 1) {
            //updating successful
            M.toast({
              html: "updating successful",
              displayLength: 4000,
            });
            this.$emit("updated");
            for (let value in values) {
              store.dispatch("setProps", {
                name: value,
                value: values[value],
                type: "user",
              });
            }
            store.dispatch("setProps", {
              name: "dp",
              value: this.dpURL,
              type: "user",
            });
          }
          // store.dispatch('login', response.data);
          //this.bearerToken = response.data.access_token;
          //console.log(response.data);
          return false;
        })
        .catch(() => {
          //console.log(error);
          this.loading = false;
          this.error = true;
          this.errorMessages.push(
            "Sorry, an error occurred on the server. Try again."
          );
        }); // credentials didn't match
    },
  },
  mounted() {
    for (let state in this.states) {
      this.statesData.push(state);
    }
    //display form values if isEditing
    if (this.isEditing) {
      this.tel = this.user.tel;
      this.state = this.user.state;
      this.lga = this.user.address.replace(":", "");
      this.firstName = this.user.first_name;
      this.lastName = this.user.last_name;
      this.dpURL = this.user.dp;
    }
  },
};
</script>
<style lang="scss" scoped>
input:not([type]),
input[type="text"]:not(.browser-default),
input[type="password"]:not(.browser-default) {
  background-color: #fff;
  border: 2px solid rgba(229, 231, 235, var(--tw-border-opacity));
  border-radius: 0.5rem;
  padding-left: 2.5rem;
  width: 100%;
}
input:not([type]),
input[type="text"]:disabled:not(.browser-default) {
  background-color: rgb(252, 252, 252);
  font-weight: bolder;
  outline: none;
  border: none;
}
</style>
