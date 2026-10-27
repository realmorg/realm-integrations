defmodule RealmPhoenix.MixProject do
  use Mix.Project

  def project do
    [
      app: :realm_phoenix,
      version: "0.1.0",
      elixir: "~> 1.18",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [mod: {RealmPhoenix.Application, []}, extra_applications: [:logger]]
  end

  defp deps do
    [
      {:phoenix, "~> 1.8.16"},
      {:phoenix_live_view, "~> 1.2.13"},
      {:phoenix_html, "~> 4.3"},
      {:bandit, "~> 1.14"},
      {:jason, "~> 1.4"}
    ]
  end
end
