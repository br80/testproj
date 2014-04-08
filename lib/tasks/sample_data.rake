namespace :db do
  desc "Add some wisdom quotes"
  task populate: :environment do
    wisdom = [
      {content: "The only true wisdom is in knowing you know nothing.",
       author: "Socrates"},
      {content: "Imagination is more important than knowledge.",
       author: "Albert Einstein"},
      {content: "Beware of false knowledge; it is more dangerous than ignorance.",
       author: "George Bernard Shaw"},
      {content: "Winners never quit and quitters never win.",
       author: "Vince Lombardi"},
      {content: "Learning acquired in youth arrests the evil of old age; and if you understand that old age has wisdom for its food, you will so conduct yourself in youth that your old age will not lack for nourishment.",
       author: "Leonardo da Vinci"},
      {content: "The best way to predict the future is to invent it.",
       author: "Alan Kay"},
      {content: "I believe that a scientist looking at nonscientific problems is just as dumb as the next guy",
       author: "Richard Feynman"},
      {content: "By failing to prepare, you are preparing to fail.",
       author: "Benjamin Franklin"},
      {content: "Think lightly of yourself and deeply of the world.",
       author: "Miyamoto Musashi"}]
    wisdom.each do |nugget|
      Quote.create!(content: nugget[:content],
                    author: nugget[:author])
    end
  end
end