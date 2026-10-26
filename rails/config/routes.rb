Rails.application.routes.draw do
  root "subscriptions#new"
  resource :subscription, only: [:create, :show]
end
