class Playlist
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  has_and_belongs_to_many :songs

  validates :name, presence: true,
    uniqueness: {
      case_sensitive: false
    }

  belongs_to :user

  def add_song(url)
    song_detail = Song.song_info(url)
    song = Song.where(url: song_detail[:url]).last
    song ||= Song.create(song_detail)
    if(self.song_ids.exclude?(song.id))
      self.songs << song
      self.save
    end
  end
end
