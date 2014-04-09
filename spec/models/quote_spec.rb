require 'spec_helper'

describe Quote do

  before { @quote = Quote.create(content: "Lorem Ipsum.", author: "John Doe") }

  subject { @quote }

  it { should respond_to(:content) }
  it { should respond_to(:author) }

  it { should be_valid }

  describe "When content is not present" do
    before { @quote.content = nil }
    it {should_not be_valid}
  end

  describe "When author is not present" do
    before { @quote.author = nil }
    it {should_not be_valid}
  end
end
