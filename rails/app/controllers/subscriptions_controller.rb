class SubscriptionsController < ApplicationController
  def new
    @user = { name: "Ada Lovelace", plan: "Pro" }
  end

  def create
    email = params.expect(:email)
    redirect_to subscription_path, flash: { email: email }
  end

  def show
    @email = flash[:email]
  end
end
