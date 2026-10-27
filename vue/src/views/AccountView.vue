<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);

onMounted(async () => {
  const response = await fetch("/api/me");
  user.value = await response.json();
});

async function subscribe(event) {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    body: new URLSearchParams(new FormData(event.target)),
  });
  const { email } = await response.json();
  router.push({ path: "/subscribed", query: { email } });
}
</script>

<template>
  <h1>Account</h1>

  <user-card v-if="user" :name="user.name" :plan="user.plan"></user-card>

  <form @submit.prevent="subscribe">
    <ui-field>
      <ui-label for="email">Email</ui-label>
      <ui-input id="email" name="email" type="email" required></ui-input>
    </ui-field>
    <ui-button type="submit">Subscribe</ui-button>
  </form>
</template>
