<script>
  let { data, form } = $props();
</script>

<svelte:head>
  <title>{form ? "Subscribed" : "Account"}</title>
</svelte:head>

<main>
  {#if form?.email}
    <h1>Thanks</h1>
    <p>Subscribed: {form.email}</p>
    <p><a href="/">Back</a></p>
  {:else}
    <h1>Account</h1>

    <user-card name={data.user.name} plan={data.user.plan}></user-card>

    <form method="POST" action="?/subscribe">
      <ui-field>
        <ui-label for="email">Email</ui-label>
        <ui-input id="email" name="email" type="email" required></ui-input>
      </ui-field>
      <ui-button type="submit">Subscribe</ui-button>
    </form>
  {/if}
</main>
