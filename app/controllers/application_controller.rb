class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_filter :reload_assets

  private

  def reload_assets
    path = Rails.root.join('vendor', 'webpack-assets.json')
    file = File.read(path)
    @assets_container = JSON.parse(file)
  end
end

