defmodule RealmPhoenixWeb.Router do
  use RealmPhoenixWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {RealmPhoenixWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/", RealmPhoenixWeb do
    pipe_through :browser

    live "/", AccountLive
    post "/subscribe", SubscriptionController, :create
    get "/subscribed", SubscriptionController, :show
  end
end
