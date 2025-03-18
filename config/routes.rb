Rails.application.routes.draw do
  resources :labels
  resources :tasks, param: :task_id do
    member do
      get :archive  # or post, depending on your use case
    end
  end

  get '/export_tasks', to: 'tasks#export_tasks', defaults: { format: 'csv' }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  

  # Defines the root path route ("/")
  # root "posts#index"
end
