class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.string :task_id
      t.string :title
      t.string :status
      t.string :priority

      t.timestamps
    end
  end
end
