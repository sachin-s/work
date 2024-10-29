class Task < ApplicationRecord
  def to_s
    "Task ID: #{task_id}, Title: #{title}, Status: #{status}, Priority: #{priority}"
  end
end
