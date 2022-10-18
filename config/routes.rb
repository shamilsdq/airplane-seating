Rails.application.routes.draw do
  namespace :api do
    post 'seating' => 'seating#generate', as: 'generate_seating'
  end

  root 'home#index'
  get '*path', to: 'home#index', via: :all
end
