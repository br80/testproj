class AddTurnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :turn, :fixnum
  end
end
