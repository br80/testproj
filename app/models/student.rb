class Student < ActiveRecord::Base
  belongs_to :user
  validates :user_id, presence: true
  before_save { self.name = Faker::Name.first_name }

end
