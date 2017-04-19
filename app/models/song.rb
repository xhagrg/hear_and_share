class Song
  # api key to access details of the video from youtube.
  API_KEY = 'AIzaSyDZNn1SZHX1QhyHXR5ckih6I15gk3FrpKs'
  API_URL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id='
  YOUTUBE_URL = 'https://www.youtube.com/watch?v='

  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :url,  type: String
  # field :track_no, type: Integer
  field :info, type: String
  field :play_count, type: Integer, default: 0
  field :thumbnail_url, type: String

  has_and_belongs_to_many :playlist

  def self.song_info(url)
    song_id = url.split('v=')[1].split('&')[0]
    response = HTTParty.get(
      "#{API_URL}#{song_id}&key=#{API_KEY}"
    ).parsed_response['items'][0]['snippet']
    { 
      url: "#{YOUTUBE_URL}#{song_id}",
      name: response['title'], 
      info: response['description'],
      thumbnail_url: response['thumbnails']['default']['url']
    }
  end
end