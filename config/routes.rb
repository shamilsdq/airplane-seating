Rails.application.routes.draw do
  namespace :api do
    post 'seating' => 'seating#generate', as: 'generate_seating'
  end
end
