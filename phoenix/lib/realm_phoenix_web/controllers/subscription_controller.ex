defmodule RealmPhoenixWeb.SubscriptionController do
  use RealmPhoenixWeb, :controller

  def create(conn, %{"email" => email}) do
    conn
    |> put_session(:subscribed, email)
    |> put_status(:see_other)
    |> redirect(to: "/subscribed")
  end

  def show(conn, _params) do
    render(conn, :show, page_title: "Subscribed", email: get_session(conn, :subscribed))
  end
end
