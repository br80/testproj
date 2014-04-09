require 'spec_helper'

describe "Help page" do

  subject { page }

  describe "Help page" do

    describe "should work with no quotes in the database" do
      before { visit help_path }

      let(:heading)    { 'Help' }
      let(:page_title) { 'Help' }

      it { should have_selector('h1', text: heading) }
      it { should have_title(full_title(page_title)) }
      it { should have_content('Donald Knuth') }
    end

    describe "should use quote from database if is database is not empty" do
      before { @quote = Quote.create(content: 'Lorem Ipsum.', author: 'John Doe') }
      before { visit help_path }

      it { should have_content('Lorem Ipsum.') }
      it { should have_content('John Doe') }
      it { should_not have_content('Donald Knuth') }
    end
  end
end