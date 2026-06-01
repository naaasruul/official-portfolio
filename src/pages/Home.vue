<script setup>
import Layout from '../layouts/MainLayout.vue'
import ParticleBackground from '../components/ParticleBackground.vue'
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import Services from '../components/Services.vue'
import Skills from '../components/Skills.vue'
import Projects from '../components/Projects.vue'
import ContactForm from '../components/ContactForm.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <Layout>
    <!-- Responsive Canvas Particle Network Background -->
    <ParticleBackground />

    <!-- Sticky Navigation Header -->
    <Navbar />

    <!-- Structured single-page scroll sections -->
    <Hero />
    <Services />
    <Skills />
    <Projects />
    <ContactForm />
    
    <!-- Footer -->
    <Footer />
  </Layout>
</template>