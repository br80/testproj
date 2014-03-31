class AddSubjectsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :subjects, :hash
  end
end
