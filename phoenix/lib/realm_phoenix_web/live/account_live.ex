defmodule RealmPhoenixWeb.AccountLive do
  use RealmPhoenixWeb, :live_view

  @next_plan %{"Pro" => "Team", "Team" => "Pro"}

  def mount(_params, _session, socket) do
    {:ok, assign(socket, page_title: "Account", user: %{name: "Ada Lovelace", plan: "Pro"})}
  end

  def handle_event("switch_plan", _params, socket) do
    {:noreply, update(socket, :user, &%{&1 | plan: @next_plan[&1.plan]})}
  end

  def render(assigns) do
    ~H"""
    <h1>Account</h1>

    <user-card name={@user.name} plan={@user.plan}></user-card>
    <ui-button variant="outline" phx-click="switch_plan">Switch plan</ui-button>

    <.form for={%{}} action="/subscribe">
      <ui-field>
        <ui-label for="email">Email</ui-label>
        <ui-input id="email" name="email" type="email" required></ui-input>
      </ui-field>
      <ui-button type="submit">Subscribe</ui-button>
    </.form>
    """
  end
end
