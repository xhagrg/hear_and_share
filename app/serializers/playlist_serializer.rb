class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :songs

  def id
    object._id.to_s
  end
end
