class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :name
      t.integer :math
      t.integer :reading
      t.integer :writing
      t.integer :discipline
      t.integer :user_id

      t.timestamps
    end
    add_index :students, :user_id
  end
end
