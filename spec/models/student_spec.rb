require 'spec_helper'

describe Student do

  let(:user) { FactoryGirl.create(:user) }
  before do
    # This code is not idiomatically correct.
    @student = Student.new(name: "John", user_id: user.id)
  end

  subject { @student }

  it { should respond_to(:name) }
  it { should respond_to(:math) }
  it { should respond_to(:reading) }
  it { should respond_to(:writing) }
  its(:user) { should eq user }

  it { should be_valid }

  describe "when user_id is not present" do
    before { @student.user_id = nil }
    it { should_not be_valid }
  end
end