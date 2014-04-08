class Quote < ActiveRecord::Base
  validates :content, presence: true
  validates :author, presence: true

  def self.get_random_quote
    if Quote.count == 0
      return {content: "Beware of bugs in the above code; I have only proved it correct, not tried it.",
      author: "Donald Knuth"}
    else
      return Quote.find(rand(Quote.count - 1).floor + 1)
    end
  end
end
