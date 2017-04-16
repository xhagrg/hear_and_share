class SongSerializer < ActiveModel::Serializer
  attributes :id, :name, :url, :thumbnail_url, :play_count
  
  def id
    object._id.to_s
  end
end
