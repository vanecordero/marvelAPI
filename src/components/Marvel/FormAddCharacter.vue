<template>
    <p>{{formProps.mode}} character</p>
    <form @submit.prevent="handleSubmit">
        <input 
            name="name" 
            placeholder="name"
            :value="formProps.mode === 'Edit' ? formProps.ele.name : ''"
        />
        <span v-if="error">This field is required</span>
        <textarea 
            name="description" 
            placeholder="description" 
            rows="5" maxlength="250"
            :value="formProps.mode === 'Edit' ? formProps.ele.description:''"
        >
        </textarea>
        <input 
            type="file" 
            @change="handleOnFile" 
            placeholder="urlImg" 
            ref="fileInput"
            accept="image/*"
            />
        <button type="submit">{{formProps.mode}}</button>
        <button @click="formProps.closeModal">Close</button>
    </form>
</template>


<script setup>
    import { ref } from "vue";
    import ShadowHero from '@/assets/shadow-hero.png';
    import { getFormValues } from "@/utils/getFormValues";

    const props = defineProps({
    formProps: Object,
    });

console.log(props.formProps)
    const startId = ref(props.formProps.lastId); //get the total element from the MARVEL API
    const fileInput= ref(null);
    const error = ref(false)

    function handleOnFile(e) { //get the encodeIMG
        const files = e.target.files
        if (!files.length) return

        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = () => fileInput.value = reader.result;
    }
    function handleSubmit(e){
        const formDataObj = getFormValues(e.target);
        if(formDataObj.name.trim() ==="") {
            error.value=true;
            return 
        }
        createCharater(formDataObj, fileInput)
    };
    function createCharater(data, imgsrc){
        startId.value ++; //one number to the ID
        const newVal = { //setting the object value
            id:startId.value,
            name: data.name,
            description: data.description,
            src: typeof imgsrc.value !== "string"? ShadowHero : imgsrc.value, //conditional url in case it comes empty
            modified: new Date(),
        }
        props.formProps.setNewData(newVal)
    }
</script>


<style>

</style>