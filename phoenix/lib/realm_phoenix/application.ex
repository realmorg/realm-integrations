defmodule RealmPhoenix.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {Phoenix.PubSub, name: RealmPhoenix.PubSub},
      RealmPhoenixWeb.Endpoint
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: RealmPhoenix.Supervisor)
  end
end
