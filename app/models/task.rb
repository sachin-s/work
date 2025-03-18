class Task < ApplicationRecord

  STATUSLIST = ['backlog', 'todo', 'in_progress', 'done', 'canceled','archived']
  PRIORITYLIST = ['high', 'medium', 'low']

  # validates_inclusion_of :status, in: STATUSLIST
  # validates_inclusion_of :priority, in: PRIORITYLIST


  validates :task_id, uniqueness: true
  validates :status, presence: true
  validates :priority, presence: true


  before_create :generate_task_id

  def self.getStatusDDList
    sl = STATUSLIST.each_with_object([]) do |str, array|
      # Create the object with the desired format
      object = {
        value: str.downcase,  # Downcase the string for "value"
        label: str.split('_').map(&:capitalize).join(' ')  # Capitalize each word for "label"
      }
      
      # Add to the array
      array << object
    end
    
    # Convert the array of objects to JSON
    return sl.to_json
  end

  def self.getPriorityDDList
    pl = PRIORITYLIST.each_with_object([]) do |str, array|
      # Create the object with the desired format
      object = {
        value: str.downcase,  # Downcase the string for "value"
        label: str.split('_').map(&:capitalize).join(' ')  # Capitalize each word for "label"
      }
      
      # Add to the array
      array << object
    end
          
    # Convert the array of objects to JSON
    return pl.to_json
  end

  def getTaskJson
    object = {
      task_id: task_id,
      title: title,
      status: status,
      priority: priority
    }
    return object.to_json
  end

  def archiveTask
    self.status = 'archived'
    self.save!   
  end

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
