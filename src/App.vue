<script setup>
import Projects from './components/Projects.vue'
import Header from './components/Header.vue'
import AboutMe from './components/AboutMe.vue'
import Skill from './components/Skills.vue'
import Footer from './components/Footer.vue'

</script>

<template>

<Header></Header>

<section class=" bg-white dark:bg-gray-900">
    <Projects/>

    <AboutMe/>

    <Skill/>
</section>

<Footer/>
</template>

<style scoped>

</style>
