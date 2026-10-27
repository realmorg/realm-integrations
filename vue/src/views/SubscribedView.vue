<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <h1>Thanks</h1>
  <p>Subscribed: {{ route.query.email }}</p>
  <p><RouterLink to="/">Back</RouterLink></p>
</template>
