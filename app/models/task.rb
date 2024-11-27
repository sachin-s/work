class Task < ApplicationRecord
  validates :task_id, uniqueness: true

  before_create :generate_task_id

  private
  
  def to_s
    "Task ID: #{task_id}, Title: #{title}, Status: #{status}, Priority: #{priority}, Created date: #{created_at}"
  end

  def generate_task_id
    current_month = Time.current.strftime("%m") # Get the current month in MM format
    last_task = Task.where("task_id LIKE ?", "TASK#{current_month}-%").order(created_at: :desc).first

    if last_task
      # Extract the last number and increment it
      last_number = last_task.task_id.split('-').last.to_i
      new_number = last_number + 1
    else
      # Start from 0000 if no previous tasks exist
      new_number = 0
    end

    # Reset to 0000 if it exceeds 9999
    new_number = 0 if new_number > 9999

    self.task_id = "TASK#{current_month}-#{format('%04d', new_number)}"
  end
end
