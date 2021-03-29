<template>
    <template v-if="field.length>0">
        <label for="" class="block">{{index.split(':')[0]}}</label>
        <select :name="index.split(':')[1]" id="" 
            class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
        >
            <option value="" v-for="opt of field" :key="opt">{{opt}}</option>
        </select>
    </template>
    <template v-else>
        <label for="" class="block">{{index.split(':')[0]}}</label>
        <input type="text" :name="index.split(':')[1]" id="" 
            class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
        >
    </template>
</template>
<script>
export default {
    name: "DynamicField",
    props: ['field', 'index'],
    data(){
        return{}
    },
    mounted(){
        //alert(this.index);
    }
}
</script>