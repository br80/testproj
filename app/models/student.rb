class Student < ActiveRecord::Base
  belongs_to :user
  validates :user_id, presence: true
  before_save {
    self.name = Faker::Name.first_name
    self.math = 1 + rand(5)
    self.reading = 1 + rand(5)
    self.writing = 1 + rand(5)
    self.discipline = 1 + rand(5)
  }

end
