class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_filter :reload_assets
  before_filter :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    added_attrs = [:nick_name, :first_name, :last_name, :email, :password, :password_confirmation, :remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end

  private

  def reload_assets
    path = Rails.root.join('vendor', 'webpack-assets.json')
    file = File.read(path)
    @assets_container = JSON.parse(file)
  end
end

