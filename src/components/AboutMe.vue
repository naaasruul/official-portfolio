<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const techs = [
    'Laravel',
    'Vue.js',
    'jQuery',
    'Tailwind CSS',
    'Ionic'
];
const currentTech = ref(techs[0]);
let intervalId = null;
const techKey = ref(0); // Used to trigger transition

onMounted(() => {
    let idx = 0
    intervalId = setInterval(() => {
        idx = (idx + 1) % techs.length
        currentTech.value = techs[idx]
        techKey.value++ // Change key to trigger transition

    }, 3000)
})

onUnmounted(() => {
    clearInterval(intervalId)
})


const me = {
    name: "Nasrulhaq Hidayat",
    role: "Full-Stack Developer",
    age: 21,
}


function download_resume() {
    const url = new URL('../assets/files/nas-dev-resume.pdf', import.meta.url).href; // change this to your actual file path
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nas-dev-resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
</script>
<template>
    <div class="min-h-screen bg-white dark:bg-gray-800 flex px-50 justify-center items-center">
        <div class="flex-1/2 flex p-5  h-100   rounded-md  gap-2 justify-between items-center">
            <div class="mockup-code h-full w-full">
                <pre data-prefix="$"><code><span class="text-[#317cd6]">const</span> me = <span class="text-yellow-400">{</span>
                <span class="text-[#9cdcfe]">name: </span>"Nasrulhaq Hidayat",
                <span class="text-[#9cdcfe]">role: </span>"Full-Stack Developer",
                <span class="text-[#9cdcfe]">age: </span>21,
                <span class="text-[#9cdcfe]">skills: </span>[
                    "Laravel",
                    "Vue.js",
                    "Ionic",
                    "Flutter"
                ],
                <span class="text-[#9cdcfe]">resume: </span><a @click="download_resume()" href="javascript:void(0)">Nasrul-Dev-Resume.pdf</a>
        <span class="text-yellow-400">}</span>
</code></pre>
            </div>
        </div>
        <div class="flex-1/2 flex h-100  rounded-md  justify-center items-center">
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-end lg:py-16">
                <h1
                    class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                    About Me</h1>
                <p class="mb-8 sm:text-sm font-normal text-gray-500 lg:text-lg text-justify  dark:text-gray-400">
                    I'm a full-stack developer with over 3 years of experience building systems and websites through
                    personal
                    projects, freelance work, and collaboration with others. I specialize in

                    <transition name="fade" mode="out-in">
                        <mark :key="techKey"
                            class="px-2 text-2xl text-white font-bold bg-blue-600 rounded-sm dark:bg-blue-500 transition-colors duration-300">
                            {{ currentTech }}
                        </mark>
                    </transition>
                </p>

                <p class="mb-8 sm:text-sm font-normal text-gray-500 lg:text-lg text-justify  dark:text-gray-400">
                    I have a solid foundation in API integration, backend logic, and UI/UX design. From designing
                    interfaces to connecting databases, I enjoy building full-stack solutions that solve real problems
                    and work smoothly across devices.
                </p>

                <p class="mb-8 sm:text-sm font-normal text-gray-500 lg:text-lg text-justify  dark:text-gray-400">
                    Outside of coding, I’m passionate about music and actively play in my free time—it keeps me balanced
                    and inspired, both creatively and technically.
                </p>
            </div>

        </div>

    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>