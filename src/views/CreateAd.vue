<template>
    <article class="bg-white pb-4">
        <h1
            class="w-full my-2 pt-8 text-3xl font-bold leading-tight text-center text-gray-800"
          >
            Create Free Ads
          </h1>
          <div
              class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"
            ></div>
        <p class="text-center font-mono">
            Let bridge the gap between you and your customers
        </p>
        <section>
            <div id="first-step" v-show="!step2">
                <Form 
                    class="mb-4 p-4 md:px-10" 
                    @submit="postAd" 
                    :validation-schema="schema" 
                    :initial-values ="formValues"
                    v-slot ="{values}"
                >
                    <div class="flex justify-around mt-8">
                        <div class="text-left w-1/2">
                            <label for="" class="text-xs font-semibold px-1">Category</label>
                            <Field  as="select"
                                name="category" id="category" 
                                v-model="category"
                                class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
                                @change="setOption(values.category, 'category')">
                                <option v-for="(category, index) of categories" :key="index" :value="index">{{index.split(':')[0]}}</option>
                            </Field>
                            <ErrorMessage name="category" class="block text-red-500 text-sm" />
                        </div>
                        <div class="text-left w-1/2">
                            <label for="" class="text-xs font-semibold px-1">Subcategory</label>
                            <Field  as="select" 
                                name="subcategory" id="subcategory" 
                                class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
                                @change="getFormFields(values.subcategory)"
                                >
                                <option v-for="(subcategory, index) of subcategories" :key="index" :value="subcategory.split(':')[0]">{{subcategory.split(':')[0]}}</option>
                            </Field>
                            <ErrorMessage name="subcategory" class="block text-red-500 text-sm" />
                        </div>    
                    </div>
                    <div>
                        <p class="text-center mt-8">Ads with pictures sell faster than others. Ad some to get deal fast.</p>
                        <div class="flex flex-wrap p-4 justify-center items-center  bg-gray-100">
                            <div v-for="(image, index) of adImages" :key="index" class="self-center">
                                <figure 
                                    class="w-28 h-24 overflow-hidden relative border-4 hover:border-blue-200 text-center"
                                    >
                                    <img 
                                        class="" 
                                        :src="image.previewURL" alt="" 
                                    >
                                    <figcaption>
                                        <button 
                                            type="button" 
                                            @click="deleteImage(image.id)"
                                            class="text-xs rounded-md bg-blue-700 text-white p-1 absolute bottom-0  cursor-pointer">
                                            X Delete</button>
                                    </figcaption>
                                </figure>
                            </div>
                            <div class="inline">
                                <figure 
                                class="w-28 h-24 overflow-hidden cursor-pointer border-8 hover:border-blue-500 text-center"
                                @click="$refs.uploadImg.click()"
                                >
                                <img 
                                    class="w-24" 
                                    :src="previewURL" alt="" 
                                >
                                </figure>
                                <input hidden type="file" ref="uploadImg" name="profile_image" class="" @change="addImage($event)">
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-around mt-8">
                        <div class="text-left w-1/2">
                            <label for="title" class="text-xs font-semibold px-1">Ad Title</label>
                            <Field type="text" name="title" id="title" class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded" />
                            <ErrorMessage name="title" class="block text-red-500 text-sm" />
                        </div>
                        <div class="text-left w-1/2">
                            <label for="price" class="text-xs font-semibold px-1">Price (N)</label>
                            <Field type="number" min="10" step="5" name="price" id="price" class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded" />
                            <ErrorMessage name="price" class="block text-red-500 text-sm" />
                            <label for="negotiable">
                                <Field type="checkbox" name="negotiable" id="negotiable" /> Negotiable
                            </label>
                        </div>
                    </div>    
                    <div class="mt-8">
                        <label for="description">Description</label> <br>
                        <Field as="textarea" name="description" id="description" cols="30" class="w-full rounded-xl"/>
                        <ErrorMessage name="description" class="block text-red-500 text-sm" />
                    </div>
                    <div class="flex flex-wrap justify-around mt-8 text-left">
                        <p class="mb-4 w-full">Location Details</p>
                        <div class="text-left w-1/2">
                            <label for="" class="text-xs font-semibold px-1">State </label>
                            <Field as="select" 
                                name="state" id="state" 
                                class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
                                @change="setOption(values.state)">
                                <option v-for="(state, index) of states" :key="index" :value="index">{{index.split(':')[0]}}</option>
                            </Field>
                            <ErrorMessage name="state" class="block text-red-500 text-sm" />
                        </div>
                        <div class="text-left w-1/2">
                            <label for="" class="text-xs font-semibold px-1">Place</label>
                            <Field as="select" 
                                name="place" id="place" 
                                class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
                            >
                                <option v-for="(lga, index) of lgas" :key="index" :value="lga">{{lga.split(':')[0]}}</option>
                            </Field>
                            <ErrorMessage name="place" class="block text-red-500 text-sm" />
                        </div>
                    </div>
                    <div class="mt-8">
                        <p>Boost Your Ad</p>
                        <label class="block cursor-pointer hover:shadow-md hover:text-blue-900">
                            <Field type="radio" name="promoted" value="bronze"  /> <strong>Bronze</strong> Free Ad
                        </label>
                        <label class="block cursor-pointer hover:shadow-md hover:text-blue-900">
                            <Field type="radio" name="promoted" value="silver" /> <strong>Silver Ad</strong> - Stay on top list for 7 days (N2,200.00)
                        </label>
                        <label class="block cursor-pointer hover:shadow-md hover:text-blue-900">
                            <Field type="radio" name="promoted" value="gold" /> <strong>Gold Ad</strong> - Stay on top list for 30 days (N7,500.00)
                        </label>
                    </div>
                    <div class="text-center mt-8">
                        <button class="py-3 px-5 border-2 border-gray-100 bg-blue-400 rounded hover:bg-white shadow-lg">
                            Next
                        <span class="mdi mdi-arrow-right"></span></button>
                    </div>
                </Form>
            </div>
            <div v-show="step2" class="w-full bg-white">
                <form @submit.prevent="onSubmit($event)" class="flex flex-wrap justify-around w-full md:w-4/5 m-auto bg-gray-100">
                    <div v-for="(field, index) of detailsFields" :key="index" class="w-1/2 bg-white my-0.5 p-2 text-center">
                        <dynamic-field :field = "field" :index = "index"></dynamic-field>
                    </div>
                    <div class="w-full flex justify-center mt-4">
                        <button class="py-4 px-6 bg-blue-600 text-gray-100 hover:bg-blue-900">Create Ad</button>
                    </div>
                </form>
                <div class="flex justify-around mt-8">
                    <button @click="step2 = !step2" class="py-3 px-5 border-2 border-gray-500 rounded-xl hover:bg-blue-400">
                       <span class="mdi mdi-arrow-left"></span> Back
                    </button>
                    <button 
                        class="py-3 px-5 border-2 border-gray-500 rounded-xl hover:bg-blue-400"
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
import { mapState } from 'vuex';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import DynamicField from "@/components/DynamicField.vue"
import router from '../router';

export default {
    name: "CreateAd",
    components:{
      Field, 
      Form, 
      ErrorMessage,
      DynamicField
    },
    data(){
        const schema = yup.object({
            category: yup.string().required(),
            subcategory: yup.string().required(),
            title: yup.string().required().min(15).max(85),
            price: yup.number().required().min(5).max(1000000000),
            description: yup.string().required().min(15).max(800),
            state: yup.string().required(),
            place: yup.string().required(),
            name: yup.string().required(),
        });
        const formValues = {
            category: '',
            subcategory: '',
            title: '',
            price: null,
            description: '',
            state: '',
            place: '',
            negotiable: null,
            promoted: 'bronze'
        }
        return{
            schema,
            formValues,
            category: null,
            subcategory: '',
            createAd: false,
            subcategories: null,
            previewURL: require("../assets/images/preview_img_placeholder.png"),
            adImages:[],
            lgas: null,
            loading: false,
            detailsFields: null,
            adData: null,
            step2:false,
            step1Data:null
        }
    },
    computed: {
        ...mapState([
            "states",
            "categories",
            "accessToken"
            ])
    },
    methods:{
        getFormFields(data){
            this.subcategory = data;
            //alert(this.category +' : '+ this.subcategory);
            this.axios.post(process.env.VUE_APP_APIURL+"/ads/create/get_form_fields",{category: this.category,subcategory:this.subcategory}, {headers: {Authorization: `Bearer ${this.accessToken}`}}).then(response=>{
                this.detailsFields = response.data;
                //console.log(response.data);
            })
        },
        setOption(formValue, optionType = false){
            if(optionType){
                //console.log(formValue);
                this.subcategories = this.categories[formValue];
                this.subcategories.shift();this.subcategories.shift();
                //this.subcategories = subcategories
                //console.log(this.subcategories); /**/
            }else{
                this.lgas = this.states[formValue];
                //console.log(this.lgas);
                //console.log(this.categories);
            }
        },
        addImage(e){
            let targetImg=e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(targetImg);
            reader.onload = (e)=>{
                this.adImages[ this.adImages.length ] = ({previewURL: e.target.result, uploadImg: targetImg, id: this.adImages.length});
                //console.log(targetImg);
            }
            //alert("About adding new image to the ad ");
            //console.log(this.adImages);
        },
        deleteImage(id){
            this.adImages = this.adImages.filter(image => {
                return image.id != id;
            });
            for(let image of this.adImages){
                if(image.id > id){
                    image.id = image.id - 1;
                }
            }
            alert("deleted image of ID: "+id);
            console.log(this.adImages)
        },
        postAd(values){
            this.step2 = true;
            //console.log(this.adImages);
            //alert("About to post ad to server");
            this.step1Data = values;
            this.step2 = true;
            
        },
        onSubmit(e, skikppedDetails = false){
            this.loading = true;
            this.adData = skikppedDetails? new FormData() : new FormData(e.target);
            for(let field in this.step1Data){
                this.adData.append(field, this.step1Data[field]);
            }
            for(let image of this.adImages){
                console.log(image.uploadImg);
                this.adData.append('images[]', image.uploadImg);
            }
            if(skikppedDetails){
                this.adData.append('skipped_details', true);
            }
            this.axios.post(process.env.VUE_APP_APIURL+"/ads/create", this.adData, {headers: {Authorization: `Bearer ${this.accessToken}`}}).then(()=>{
                this.loading = false;
                router.push('/userarea');
                //console.log(response.data);
            }).catch(()=>{
                console.log('Something wrong from the server.');
                //console.log(error);
                this.loading = false;
            })
            //alert('Submitting');
        }
    },
    mounted(){
        //console.log(this.states);
    }
}
</script>