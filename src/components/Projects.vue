<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ref, onMounted } from 'vue'

// Example project data
const projects = [
  {
    id: 1,
    title: 'Examination System',
    image: '../assets/projects/examinationSystemBanner.jpg',
    short: 'A modern portfolio built with Vue.js and Tailwind CSS.',
    details: 'This project showcases my skills in Vue.js, Tailwind CSS, and responsive web design. It features a dark/light theme toggle, animated sections, and a contact form.',
    link: 'https://github.com/yourusername/portfolio'
  },
  {
    id: 2,
    title: 'E-commerce App',
    image: 'https://picsum.photos/seed/ecommerce/800/600',
    short: 'A full-featured e-commerce platform with cart and checkout.',
    details: 'Built with Vue 3 and Firebase, this app supports product browsing, cart management, and secure checkout. Includes admin dashboard for inventory management.',
    link: 'https://github.com/yourusername/ecommerce'
  },
  {
    id: 3,
    title: 'Blog Platform',
    image: 'https://picsum.photos/seed/blog/800/600',
    short: 'A simple and clean blog platform for sharing articles.',
    details: 'This blog platform allows users to create, edit, and delete posts. It uses Vue Router for navigation and supports markdown formatting.',
    link: 'https://github.com/yourusername/blog'
  },
  // Add more projects as needed
]
var $targetEl;
var options;
var instanceOptions;
var modal = null;''

function url(path){
  const url = new URL(path,import.meta.url).href

  return url;
}

onMounted(() => {
  $targetEl = document.getElementById('default-modal');
  // options with default values
  options = {
    placement: 'center-center',
    backdrop: 'dynamic',
    backdropClasses:
      'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      console.log('modal is hidden');
    },
    onShow: () => {
      console.log('modal is shown');
    },
    onToggle: () => {
      console.log('modal has been toggled');
      modal.hide();
    },
  };
  // instance options object
  instanceOptions = {
    id: 'modalEl',
    override: true
  };
  modal = new Modal($targetEl, options, instanceOptions);

})


// Carousel config
const config = {
  itemsToShow: 1,
  gap: 8,
  wrapAround: true,
  breakpoints: {
    640: {
      itemsToShow: 1,
      gap: 8,
    },
    768: {
      itemsToShow: 2,
      gap: 16,
    },
    1024: {
      itemsToShow: 3,
      gap: 24,
    }
  }
}

// Modal state
const selectedProject = ref(null)

// Close modal
function closeModal() {
  modal.hide();
}

function openProject(project) {
  console.log('Opening project:', project.title);
  selectedProject.value = project;

  // console.log(selectedProject.value);
  modal.show();
}
</script>

<template>
  <section class="bg-white px-50 min-h-screen dark:bg-gray-900 antialiased">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
      <div class="max-w-2xl mx-auto text-center mb-8">
        <h2 class="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          My Projects
        </h2>
        <p class="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
          A selection of my favorite work, built with modern web technologies.
        </p>
      </div>

      <Carousel v-bind="config">

        <Slide class="flex" v-for="project in projects" :key="project.id">
          <div @click="openProject(project)"
            class="cursor-pointer max-w-sm h-full  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div clas>
              <img class="rounded-t-lg w-100 object-cover" style="height: 300px;"
                :src="url(project.image)"
                alt="" />
            </div>
            <div class="p-5">
              <div>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {{ project.title }}
                </h5>
              </div>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ project.short }}</p>
              <button @click="openModal(project)"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </button>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>

      </Carousel>
    </div>

    <!-- Main modal -->
    <div id="default-modal" tabindex="-1" aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ selectedProject?.title }}
            </h3>
            <button type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal" @click="closeModal()">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5 space-y-4">
            <div id="indicators-carousel" class="relative w-full" data-carousel="static">
              <!-- Carousel wrapper -->
              <div class="relative h-56 overflow-hidden rounded-md md:h-96">
                
                <!------------- ITEMS ------------->
                <!-- Item 1 -->
                <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
                  <img
                    src="https://hips.hearstapps.com/hmg-prod/images/wandavision-accent-1613490782.jpg?crop=0.502xw:1.00xh;0.251xw,0&resize=1200:*"
                    class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                </div>
                <!-- Item 2 -->
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                  <img
                    src="https://hips.hearstapps.com/hmg-prod/images/wandavision-accent-1613490782.jpg?crop=0.502xw:1.00xh;0.251xw,0&resize=1200:*"
                    class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                </div>
                <!------------- ITEMS ------------->

              </div>

              <!-- Slider indicators -->
              <div class="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1"
                  data-carousel-slide-to="0"></button>
                <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2"
                  data-carousel-slide-to="1"></button>
              </div>
              <!-- Slider controls -->
              <button type="button"
                class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev>
                <span
                  class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 1 1 5l4 4" />
                  </svg>
                  <span class="sr-only">Previous</span>
                </span>
              </button>
              <button type="button"
                class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next>
                <span
                  class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 9 4-4-4-4" />
                  </svg>
                  <span class="sr-only">Next</span>
                </span>
              </button>


            </div>
            <h1 class="text-4xl mt-3 text-gray-800 font-semibold dark:text-gray-200">{{ selectedProject?.title }}</h1>
            <hr class="text-white">
              <h1 class="text-lg mt-3 text-gray-800 dark:text-gray-200 font-extralight">{{ selectedProject?.details }}</h1>

          </div>
          <!-- Modal footer -->
          <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <a v-if="selectedProject?.link" :href="selectedProject?.link" target="_blank"
              class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">View on
              GitHub</a>
            <button data-modal-hide="default-modal" type="button" @click="closeModal"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
          </div>
        </div>
      </div>
    </div>
  </section>



</template>

<style>
:root {
  background-color: #242424;
}

.carousel {
  --vc-pgn-background-color: rgba(255, 255, 255, 0.7);
  --vc-pgn-active-color: rgba(59, 130, 246, 1);
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}
</style>
