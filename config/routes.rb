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
      resources :playlists do
        member do
          post :remove_song
        end
        collection do
          post :song_count
        end
      end
    end
  end

  get 'playlists/:id', to: 'home#index'
  get 'playlists/', to: 'home#index'
end
