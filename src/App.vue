<template>
  <RouterView />
  <SiteFooter />
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteFooter from "@/components/layout/SiteFooter.vue";
</script>