require_relative "boot"

require "rails"
require "action_controller/railtie"
require "action_view/railtie"

Bundler.require(*Rails.groups)

module Newsletter
  class Application < Rails::Application
    config.load_defaults 8.1
    config.eager_load = Rails.env.production?
    config.secret_key_base = ENV.fetch("SECRET_KEY_BASE", "development-only-secret-key-base-0123456789")
    config.logger = ActiveSupport::Logger.new($stdout)
  end
end
