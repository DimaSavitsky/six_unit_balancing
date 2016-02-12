Rails.application.routes.draw do

  resources :games, except: [:edit, :update] do
    resources :characters, except: [:index, :destroy]
    resources :battles, except: [:index, :destroy, :edit, :update]
  end

  root 'games#index'
end
