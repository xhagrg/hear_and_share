class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :user_name, :type, :error
  has_many :songs

  def id
    object._id.to_s
  end

  def user_id
    object.user_id.to_s
  end

  def user_name
    object.user.name
  end

  def type
    object._type
  end

  def error
    object.errors.full_messages
  end
end
