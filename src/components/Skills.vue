<script setup>

const skills = [
    {
        id: 1,
        skill_name: 'python',
        path: '../assets/skills/python.png',
    },
    {
        id: 2,
        skill_name: 'html',
        path: '../assets/skills/html.png',
    },
    {
        id: 3,
        skill_name: 'css',
        path: '../assets/skills/css.png',
    },
    {
        id: 4,
        skill_name: 'js',
        path: '../assets/skills/js.png',
    },
    {
        id: 5,
        skill_name: 'php',
        path: '../assets/skills/php.png',
    },
    {
        id: 5,
        skill_name: 'mysql',
        path: '../assets/skills/sql-server.png',
    },
    {
        id: 6,
        skill_name: 'dart',
        path: '../assets/skills/dart.png',
    }

]


const frameworks = [
    {
        id:1,
        name:'laravel',
        path:'../assets/skills/laravel.png'
    },
    {
        id:2,
        name:'vue',
        path:'../assets/skills/vue.png'
    },
    {
        id:3,
        name:'flutter',
        path:'../assets/skills/flutter.png'
    },
    {
        id:5,
        name:'django',
        path:'../assets/skills/django.png'
    },
    {
        id:6,
        name:'tailwind',
        path:'../assets/skills/tailwind.png'
    },
    {
        id:7,
        name:'bootstrap',
        path:'../assets/skills/bootstrap.png'
    },
]

const tools = [
    {
        id:1,
        name:'figma',
        path:'../assets/skills/figma.webp'
    },

]



const getSkillImg = (path) => new URL(path, import.meta.url).href

</script>
<template>
    <section class="bg-white px-50 min-h-screen dark:bg-gray-900 antialiased">
        <div class="max-w-screen-xl p-4  mx-auto lg:px-6 sm:py-10 lg:pt-20">
            <div class="max-w-2xl mx-auto text-center mb-8">
                <h2 class="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                    My Projects
                </h2>
                <p class="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
                    A selection of my favorite work, built with modern web technologies.
                </p>
            </div>
        </div>
        <p class="w-full text-center text-lg font-semibold mb-5 py-4">Languages</p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-6 gap-7 content-center place-content-center">
            <div v-for="skill in skills" :key="skill"
                class="p-5 flex flex-col items-center justify-center border-1 rounded-xl border-white bg-gray-800">
                <img class="object-cover" style="width: 40px; height: 40px;" :src="getSkillImg(skill.path)" alt="">
                <h6 class="text-sm text-gray-400 font-semibold mt-3 capitalize">{{ skill.skill_name }}</h6>
            </div>
        </div>

        <p class="w-full mt-5 text-center text-lg font-semibold mb-5 py-4">Frameworks</p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-6 gap-7 content-center place-content-center">
            <div v-for="skill in frameworks" :key="skill"
                class="p-5 flex flex-col items-center justify-center border-1 rounded-xl border-white bg-gray-800">
                <img class="object-cover" style=" height: 40px;" :src="getSkillImg(skill.path)" alt="">
                <h6 class="text-sm text-gray-400 font-semibold mt-3 capitalize">{{ skill.name }}</h6>
            </div>
        </div>

        <p class="w-full mt-5 text-center text-lg font-semibold mb-5 py-4">Tools</p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-6 gap-7 content-center place-content-center">
            <div v-for="skill in tools" :key="skill"
                class="p-5 flex flex-col items-center justify-center border-1 rounded-xl border-white bg-gray-800">
                <img class="object-cover" style=" height: 40px;" :src="getSkillImg(skill.path)" alt="">
                <h6 class="text-sm text-gray-400 font-semibold mt-3 capitalize">{{ skill.name }}</h6>
            </div>
        </div>



    </section>

</template>