<script>
import AnimationText from './AnimationText.vue';
export default {
    name: 'Header2',
    components: {
        AnimationText,
    },
}

</script>

<template>

    <section class="bg-white dark:bg-gray-900 w-100">

        <div class="py-8 px-4  w-100 justify-center flex flex-col items-center text-center">
          
            <AnimationText title="NAS" />

            <!-- Subtitle -->
            <p class=" mb-8 text-xl w-100 tracking-tight leading-none font-normal text-gray-600 dark:text-gray-300">
                Please hire me.
            </p>
<!-- 
            <div class="flex">
                <button>About Me</button>
            </div> -->

        </div>
    </section>




</template>

