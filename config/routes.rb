Rails.application.routes.draw do

  resources :games, except: [:edit, :update] do
    resources :characters, except: [:index, :destroy]
  end

  root 'games#index'
end
