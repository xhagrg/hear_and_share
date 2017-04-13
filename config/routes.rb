Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "home#index"

  resources :home, only: :index

  devise_scope :user do
    get 'sign_in', to: 'devise/sessions#new'
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show]
      resources :invitations
      resources :playlists
    end
  end
end
