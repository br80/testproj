json.array!(@users) do |user|
  json.extract! user, :id, :name, :turn, :students, :subjects
  json.url user_url(user, format: :json)
end
