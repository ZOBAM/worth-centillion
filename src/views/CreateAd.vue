<template>
  <article class="tw-bg-white tw-pb-4">
    <h1
      class="tw-w-full tw-my-2 tw-pt-8 tw-text-3xl tw-font-bold tw-leading-tight tw-text-center tw-text-gray-800"
    >
      Create Free Ads
    </h1>
    <div
      class="tw-h-1 tw-mx-auto gradient tw-w-64 opacity-25 tw-my-0 tw-py-0 tw-rounded-t"
    ></div>
    <p class="tw-text-center tw-font-mono">
      Let bridge the gap between you and your customers
    </p>
    <section>
      <div id="first-step" v-show="!step2">
        <Form
          class="tw-mb-4 tw-p-4 md:tw-px-10"
          @submit="postAd"
          :validation-schema="schema"
          :initial-values="formValues"
          v-slot="{ values }"
        >
          <div class="tw-flex tw-justify-around tw-mt-8">
            <div class="tw-text-left tw-w-1/2">
              <label for="" class="tw-text-xs tw-font-semibold tw-px-1"
                >Category</label
              >
              <Field
                as="select"
                name="category"
                id="category"
                v-model="category"
                class="w-4/5 md:w-2/3 tw-outline-none tw-border-0 tw-border-b-2 tw-border-gray-400 focus:tw-outline-none focus:tw-border-transparent rounded"
                @change="setOption(values.category, 'category')"
              >
                <option
                  v-for="(category, index) of categories"
                  :key="index"
                  :value="index"
                  >{{ index.split(":")[0] }}</option
                >
              </Field>
              <ErrorMessage
                name="category"
                class="block tw-text-red-500 tw-text-sm"
              />
            </div>
            <div class="tw-text-left tw-w-1/2">
              <label for="" class="tw-text-xs tw-font-semibold tw-px-1"
                >Subcategory</label
              >
              <Field
                as="select"
                name="subcategory"
                id="subcategory"
                class="w-4/5 md:w-2/3 tw-outline-none tw-border-0 tw-border-b-2 tw-border-gray-400 focus:tw-outline-none focus:tw-border-transparent rounded"
                @change="getFormFields(values.subcategory)"
              >
                <option
                  v-for="(subcategory, index) of subcategories"
                  :key="index"
                  :value="subcategory.split(':')[0]"
                  >{{ subcategory.split(":")[0] }}</option
                >
              </Field>
              <ErrorMessage
                name="subcategory"
                class="block tw-text-red-500 tw-text-sm"
              />
            </div>
          </div>
          <div>
            <p class="tw-text-center tw-mt-8">
              Ads with pictures sell faster than others. Ad some to get deal
              fast.
            </p>
            <div
              class="tw-flex tw-flex-wrap tw-p-4 tw-justify-center items-center tw-bg-gray-100"
            >
              <div
                v-for="(image, index) of adImages"
                :key="index"
                class="self-center"
              >
                <figure
                  class="tw-w-28 tw-h-24 tw-overflow-hidden tw-relative tw-border-4 hover:tw-border-blue-200 tw-text-center"
                >
                  <img class="" :src="image.previewURL" alt="" />
                  <figcaption>
                    <button
                      type="button"
                      @click="deleteImage(image.id)"
                      class="tw-text-xs tw-rounded-md tw-bg-red-700 tw-text-white tw-p-1 tw-absolute tw-bottom-0  tw-cursor-pointer"
                    >
                      X Delete
                    </button>
                  </figcaption>
                </figure>
              </div>
              <div class="inline">
                <figure
                  class="tw-w-28 tw-h-24 tw-overflow-hidden tw-rounded-2xl  tw-cursor-pointer tw-border-4 hover:tw-border-blue-500 tw-text-center tw-border-gray-400"
                  @click="$refs.uploadImg.click()"
                >
                  <img class="w-24" :src="previewURL" alt="" />
                </figure>
                <input
                  hidden
                  type="file"
                  ref="uploadImg"
                  name="profile_image"
                  class=""
                  @change="addImage($event)"
                />
              </div>
            </div>
          </div>
          <div class="tw-flex tw-justify-around tw-mt-8">
            <div class="tw-text-left tw-w-1/2">
              <label for="title" class="tw-text-xs tw-font-semibold tw-px-1"
                >Ad Title</label
              >
              <Field
                type="text"
                name="title"
                id="title"
                class="w-4/5 md:w-2/3 tw-outline-none tw-border-0 tw-border-b-2 tw-border-gray-400 focus:tw-outline-none focus:tw-border-transparent tw-rounded"
              />
              <ErrorMessage
                name="title"
                class="block tw-text-red-500 tw-text-sm"
              />
            </div>
            <div class="tw-text-left tw-w-1/2">
              <label for="price" class="tw-text-xs tw-font-semibold tw-px-1"
                >Price (N)</label
              >
              <Field
                type="number"
                min="10"
                step="50"
                name="price"
                id="price"
                class="w-4/5 md:w-2/3 tw-outline-none tw-border-0 tw-border-b-2 tw-border-gray-400 focus:tw-outline-none focus:tw-border-transparent rounded"
              />
              <ErrorMessage
                name="price"
                class="block tw-text-red-500 tw-text-sm"
              />
              <label for="negotiable">
                <Field type="checkbox" name="negotiable" id="negotiable" />
                <span>Negotiable</span>
              </label>
            </div>
          </div>
          <div class="tw-mt-8">
            <label for="description">Description</label> <br />
            <Field
              as="textarea"
              name="description"
              id="description"
              cols="30"
              class="tw-w-full tw-rounded-xl"
            />
            <ErrorMessage
              name="description"
              class="block tw-text-red-500 tw-text-sm"
            />
          </div>
          <div
            class="tw-flex tw-flex-wrap tw-justify-around tw-mt-8 tw-text-left"
          >
            <p class="tw-mb-4 tw-w-full">Location Details</p>
            <div class="tw-text-left tw-w-1/2">
              <label for="" class="tw-text-xs tw-font-semibold tw-px-1"
                >State
              </label>
              <Field
                as="select"
                name="state"
                id="state"
                class="w-4/5 md:w-2/3 tw-outline-none tw-border-0 tw-border-b-2 tw-border-gray-400 focus:tw-outline-none focus:tw-border-transparent rounded"
                @change="setOption(values.state)"
              >
                <option
                  v-for="(state, index) of states"
                  :key="index"
                  :value="index"
                  >{{ index.split(":")[0] }}</option
                >
              </Field>
              <ErrorMessage
                name="state"
                class="block tw-text-red-500 tw-text-sm"
              />
            </div>
            <div class="tw-text-left tw-w-1/2">
              <label for="" class="tw-text-xs tw-font-semibold tw-px-1"
                >Place</label
              >
              <Field
                as="select"
                name="place"
                id="place"
                class="w-4/5 md:w-2/3 tw-outline-none tw-border-0 tw-border-b-2 tw-border-gray-400 focus:tw-outline-none focus:tw-border-transparent rounded"
              >
                <option
                  v-for="(lga, index) of lgas"
                  :key="index"
                  :value="lga"
                  >{{ lga.split(":")[0] }}</option
                >
              </Field>
              <ErrorMessage
                name="place"
                class="block tw-text-red-500 tw-text-sm"
              />
            </div>
          </div>
          <div class="tw-mt-8">
            <p>Boost Your Ad</p>
            <label
              class="block tw-cursor-pointer hover:shadow-md hover:tw-text-blue-900"
              style="display: block"
            >
              <Field type="radio" name="promoted" value="bronze" />
              <span><strong>Bronze</strong> Free Ad</span>
            </label>
            <label
              class="block tw-cursor-pointer hover:shadow-md hover:tw-text-blue-900"
            >
              <Field type="radio" name="promoted" value="silver" />
              <span
                ><strong>Silver Ad</strong> - Stay on top list for 7 days
                <strong class="blue-text"> (N{{ promotionPrices[0] }})</strong>
              </span>
            </label>
            <label
              class="block tw-cursor-pointer hover:shadow-md hover:tw-text-blue-900"
              style="display: block"
            >
              <Field type="radio" name="promoted" value="gold" />
              <span
                ><strong>Gold Ad</strong> - Stay on top list for 30 days
                <strong class="blue-text"
                  >(N{{ promotionPrices[1] }})</strong
                ></span
              >
            </label>
            <ErrorMessage
              name="promoted"
              class="tw-block tw-text-red-500 tw-text-sm"
            />
          </div>
          <div class="tw-text-center tw-mt-8">
            <button
              class="tw-py-3 tw-px-5 tw-border-2 tw-border-gray-100 tw-bg-blue-400 rounded hover:tw-bg-white shadow-lg"
            >
              Next
              <span class="mdi mdi-arrow-right"></span>
            </button>
          </div>
        </Form>
      </div>
      <div v-show="step2" class="tw-w-full tw-bg-white tw-mt-4">
        <form
          @submit.prevent="onSubmit($event)"
          class="tw-flex tw-flex-wrap tw-justify-around tw-w-full md:tw-w-4/5 tw-m-auto tw-bg-gray-100"
        >
          <div
            v-for="(field, index) of detailsFields"
            :key="index"
            class="tw-w-1/2 tw-bg-white tw-my-0.5 tw-p-2 tw-text-center"
          >
            <dynamic-field :field="field" :index="index"></dynamic-field>
          </div>
          <div class="tw-w-full tw-flex tw-justify-center tw-mt-4">
            <button
              class="tw-py-4 tw-px-6 tw-bg-blue-600 tw-text-gray-100 hover:tw-bg-blue-900"
            >
              Create Ad
            </button>
          </div>
        </form>
        <div class="tw-flex tw-justify-around tw-mt-8">
          <button
            @click="step2 = !step2"
            class="tw-py-3 tw-px-5 tw-border-2 tw-border-gray-500 tw-rounded-xl hover:tw-bg-blue-400"
          >
            <span class="mdi mdi-arrow-left"></span> Back
          </button>
          <button
            class="tw-py-3 tw-px-5 tw-border-2 tw-border-gray-500 tw-rounded-xl hover:tw-bg-blue-400"
            @click="onSubmit($event, true)"
          >
            Skip & Create Ad
          </button>
        </div>
        <span v-if="loading">Submitting . . . </span>
      </div>
    </section>
  </article>
</template>
<script>
import { mapState } from "vuex";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import DynamicField from "@/components/DynamicField.vue";
import router from "../router";
import store from "../store";

export default {
  name: "CreateAd",
  components: {
    Field,
    Form,
    ErrorMessage,
    DynamicField,
  },
  data() {
    const schema = yup.object({
      category: yup.string().required(),
      subcategory: yup.string().required(),
      title: yup
        .string()
        .required()
        .min(15)
        .max(85),
      price: yup
        .number()
        .required()
        .min(5)
        .max(1000000000),
      description: yup
        .string()
        .required()
        .min(15)
        .max(800),
      state: yup.string().required(),
      place: yup.string().required(),
      name: yup.string().required(),
    });
    const formValues = {
      category: "",
      subcategory: "",
      title: "",
      price: null,
      description: "",
      state: "",
      place: "",
      negotiable: null,
      promoted: "bronze",
    };
    return {
      schema,
      formValues,
      category: null,
      subcategory: "",
      createAd: false,
      subcategories: null,
      previewURL: require("../assets/images/preview_img_placeholder.png"),
      adImages: [],
      lgas: null,
      loading: false,
      detailsFields: null,
      adData: null,
      step2: false,
      step1Data: null,
    };
  },
  computed: {
    ...mapState([
      "states",
      "categories",
      "accessToken",
      "promotionPrices",
      "user",
    ]),
  },
  methods: {
    getFormFields(data) {
      this.subcategory = data;
      //alert(this.category +' : '+ this.subcategory);
      this.axios
        .post(
          process.env.VUE_APP_APIURL + "/ads/create/get_form_fields",
          { category: this.category, subcategory: this.subcategory },
          { headers: { Authorization: `Bearer ${this.accessToken}` } }
        )
        .then((response) => {
          this.detailsFields = response.data;
          //console.log(response.data);
        });
    },
    setOption(formValue, optionType = false) {
      if (optionType) {
        //console.log(formValue);
        this.subcategories = this.categories[formValue];
        this.subcategories.shift();
        this.subcategories.shift();
        //this.subcategories = subcategories
        //console.log(this.subcategories); /**/
      } else {
        this.lgas = this.states[formValue];
        //console.log(this.lgas);
        //console.log(this.categories);
      }
    },
    addImage(e) {
      let targetImg = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(targetImg);
      reader.onload = (e) => {
        this.adImages[this.adImages.length] = {
          previewURL: e.target.result,
          uploadImg: targetImg,
          id: this.adImages.length,
        };
        //console.log(targetImg);
      };
      //alert("About adding new image to the ad ");
      //console.log(this.adImages);
    },
    deleteImage(id) {
      this.adImages = this.adImages.filter((image) => {
        return image.id != id;
      });
      for (let image of this.adImages) {
        if (image.id > id) {
          image.id = image.id - 1;
        }
      }
      //alert("deleted image of ID: " + id);
      //console.log(this.adImages);
    },
    postAd(values, actions) {
      this.step1Data = values;
      if (values.promoted != "bronze") {
        let promotionPrice =
          values.promoted == "silver"
            ? this.promotionPrices[0]
            : this.promotionPrices[1];
        if (this.user.balance < promotionPrice) {
          this.lowBalance = true;
          /* alert(
            "ad promoted but low balance " +
              this.user.balance +
              " : " +
              promotionPrice
          ); */
          actions.setFieldError(
            "promoted",
            `Account balance is low for ${values.promoted.toUpperCase()} Ad. Please Fund your wallet and try again.`
          );
        } else {
          this.step2 = true;
        }
      } else {
        this.step2 = true;
      }

      //this.step2 = true;
      //console.log(this.adImages);
      //alert("About to post ad to server");
    },
    onSubmit(e, skikppedDetails = false) {
      this.loading = true;
      this.adData = skikppedDetails ? new FormData() : new FormData(e.target);
      for (let field in this.step1Data) {
        this.adData.append(field, this.step1Data[field]);
      }
      for (let image of this.adImages) {
        console.log(image.uploadImg);
        this.adData.append("images[]", image.uploadImg);
      }
      if (skikppedDetails) {
        this.adData.append("skipped_details", true);
      }
      this.axios
        .post(process.env.VUE_APP_APIURL + "/ads/create", this.adData, {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        })
        .then((response) => {
          this.loading = false;
          router.push("/userarea");
          store.dispatch("setProps", response.data);
          //console.log(response.data);
        })
        .catch(() => {
          alert("Posting Ad failed. Something wrong from the server.");
          //console.log(error);
          this.loading = false;
        });
      //alert('Submitting');
    },
  },
  mounted() {
    //console.log(this.states);
  },
};
</script>
<style lang="scss" scoped>
select,
input:not([type]),
input[type="text"]:not(.browser-default),
input[type="number"]:not(.browser-default) {
  display: block;
  width: 80%;
  padding: 0px 1rem;
}
label {
  color: #302f2f;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
@media (min-width: 640px) {
}
@media (min-width: 768px) {
  select {
    width: 66%;
  }
}
</style>
