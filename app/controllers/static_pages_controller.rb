class StaticPagesController < ApplicationController
  def home
    @student = current_user.students.build if signed_in?
  end

  def help
  end

  def about
  end

  def contact
  end
end
