<template>
    <div class="bg-white text-red-800 p-2 rounded-xl shadow-md" v-if="messages.length">
    <span class="h-4 w-4 bg-red-400 inline-block animate-ping rounded-full"> </span>
    <span class="mdi mdi-information text-red-500 -ml-4"></span> 
    <ul>
        <li v-for="(message, index) in messages" :key="index" class="text-sm">
            {{message}}
        </li>
    </ul>
    </div>
</template>
<script>
export default {
    name: 'ErrorAlert',
    props:['messages']
}
</script>
