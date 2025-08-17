<script setup>
import Layout from '../layouts/MainLayout.vue'
import { motion } from "motion-v"
import { onMounted, ref } from 'vue'

const isHovered = ref(false)
onMounted(() => {
  // Any additional setup can be done here
  isHovered.value = false;
})
</script>


<template>
    <Layout>
        <header>
            <motion.div
              class="text-7xl font-black w-full  text-center overflow-hidden h-[1.2em]"
              @hoverStart="isHovered = true"
              @hoverEnd="isHovered = false">
                <motion.p
                  v-if="!isHovered"
                  :initial="{ y: 40, opacity: 1 }"
                  :animate="{ y: 0, opacity: 1 }"

                  :whileHover="{
                   transition: {
                      duration: 0.4,
                      times: [0, 0.6, 1],
                      ease: ['easeInOut', 'easeOut'],
                      scale: 1.2
                    }
                  }"
                  key="nasrul">
                    Nasrulhaq Hidayat
                </motion.p>

                <motion.p
                  v-else
                  :initial="{ y: 40, opacity: 1 }"
                  :transition="{ duration: 0.4, ease: 'easeInOut' }"
                  :animate="{ y: 0, opacity: 1 }"
                  class="text-6xl font-semibold"
                  key="developer">
                    Fullstack Developer
                </motion.p>

            </motion.div>
                <p class="text-gray-400/50 text-center">Based in Shah Aley, I am a developer with over 3 years of experience building systems and applications that deliver real impact and seamless user experiences</p>

        </header>
    </Layout>
</template>