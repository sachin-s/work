# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

    ruby "3.2.3"

* System dependencies

* Configuration

* Database creation

    Update the DB connection details in config/database.yml
    `rails db:create`

* Database initialization

    `rails db:seed`

* How to run the test suite

    `rails test:system`

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

    `rails s`

* Re-build of project instructions:

    `rails new work -j esbuild -css tailwind`
    `cd work`
    `gem install jsbundling-rails`
    `bundle update`
    `rails g scaffold Task task_id:string title:string status:string priority:string`
    `rails db:migrate`
    * Add the sample tasks data in ./db/seeds.rb and execute the below
    `rails db:seed`    
    * start build and run with foreman
    `foreman start -f Procfile.dev`
    `rails g stimulus react`
    `rails g stiulus tasks`
    `yarn add react react-dom`




