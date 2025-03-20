# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
tasks = [ {:task_id=>"TASK-8782", :title=>"You can't compress the program without quantifying the open-source SSD pixel!", :status=>"in_progress", :priority=>"medium"}, 
     {:task_id=>"TASK-7878", :title=>"Try to calculate the EXE feed, maybe it will index the multi-byte pixel!", :status=>"backlog", :priority=>"medium"},
     {:task_id=>"TASK-7839", :title=>"We need to bypass the neural TCP card!", :status=>"todo", :priority=>"high"},
     {:task_id=>"TASK-5562", :title=>"The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!", :status=>"backlog", :priority=>"medium"},
     {:task_id=>"TASK-8686", :title=>"I'll parse the wireless SSL protocol, that should driver the API panel!", :status=>"canceled", :priority=>"medium"},
     {:task_id=>"TASK-1280", :title=>"Use the digital TLS panel, then you can transmit the haptic system!", :status=>"done", :priority=>"high"},
     {:task_id=>"TASK-7262", :title=>"The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!", :status=>"done", :priority=>"high"},
     {:task_id=>"TASK-1138", :title=>"Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!", :status=>"in_progress", :priority=>"medium"},
     {:task_id=>"TASK-7184", :title=>"We need to program the back-end THX pixel!", :status=>"todo", :priority=>"low"}]

# Task.destroy_all
# p "Destroyed all tasks in DB"
Task.create!(tasks)
p "Created #{Task.count} tasks in db"