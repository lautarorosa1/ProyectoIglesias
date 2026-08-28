<template>
  <main class="home">
    <HeroSection :map-route="mapRoute" />
    <MovementSection />
    <AgendaSection />
    <StatsSection />
    <TimelineSection />
    <BishopSection />
    <LookingForSection />
    <section id="mapa"><ChurchMap /></section>
  </main>
</template>

<script setup>
import HeroSection from "@/components/home/HeroSection.vue";
import MovementSection from "@/components/home/MovementSection.vue";
import AgendaSection from "@/components/home/AgendaSection.vue";
import StatsSection from "@/components/home/StatsSection.vue";
import TimelineSection from "@/components/home/TimelineSection.vue";
import BishopSection from "@/components/home/BishopSection.vue";
import ChurchMap from "@/components/map/ChurchMap.vue";
import LookingForSection from "@/components/home/LookingForSection.vue";

const mapRoute = { name: "map" };
</script>