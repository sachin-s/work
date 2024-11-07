class AddUniqueIndexToTaskId < ActiveRecord::Migration[7.1]
  def change
    add_index :tasks, :task_id, unique: true
  end
end
