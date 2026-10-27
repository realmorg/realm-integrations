defmodule RealmPhoenixWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :realm_phoenix

  @session_options [store: :cookie, key: "_realm_phoenix_key", signing_salt: "realm-session", same_site: "Lax"]

  socket "/live", Phoenix.LiveView.Socket, websocket: [connect_info: [session: @session_options]]

  plug Plug.Static, at: "/", from: :realm_phoenix, only: ~w(app.css components)
  plug Plug.Static, at: "/deps/phoenix", from: {:phoenix, "priv/static"}, only: ~w(phoenix.mjs)
  plug Plug.Static,
    at: "/deps/phoenix_live_view",
    from: {:phoenix_live_view, "priv/static"},
    only: ~w(phoenix_live_view.esm.js)

  plug Plug.RequestId
  plug Plug.Parsers, parsers: [:urlencoded], pass: ["*/*"]
  plug Plug.MethodOverride
  plug Plug.Head
  plug Plug.Session, @session_options
  plug RealmPhoenixWeb.Router
end
