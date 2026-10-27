import Config

config :realm_phoenix, RealmPhoenixWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [formats: [html: RealmPhoenixWeb.ErrorHTML], layout: false],
  pubsub_server: RealmPhoenix.PubSub,
  live_view: [signing_salt: "realm-live"]

config :phoenix, :json_library, Jason
config :logger, level: :info
