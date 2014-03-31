class AddStudentsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :students, :hash
  end
end
