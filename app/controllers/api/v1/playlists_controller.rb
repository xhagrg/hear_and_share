class Api::V1::PlaylistsController < Api::V1::ApiBaseController
  before_filter :playlist, except: [:index, :create, :song_count]
  def index
    @playlists = Playlist.where(user_id: params[:current_user_id]).to_a
    @playlists += Playlist.where(_type: 'PublicPlaylist', :user_id.in => current_user.friend_ids).to_a
    
    render json: @playlists
  end

  def create
    @playlist = Playlist.new(playlist_params)
    @playlist.save
    render json: @playlist
  end

  def show
    render json: playlist
  end

  def destroy
    if playlist.user_id.to_s == current_user.id.to_s
      playlist.destroy!
    end
  end

  def update
    if(params[:url])
      playlist.add_song(params[:url])
    elsif(playlist_params[:name])
      playlist.update_attributes(playlist_params)
    end
    render json: playlist
  end

  def remove_song
    if(playlist.user_id.to_s == params[:current_user_id])
      playlist.song_ids -= [BSON::ObjectId(params[:song_id])]
      playlist.save
    end
    render json: playlist
  end

  def song_count
    song = Song.find(params[:song_id])
    song.play_count += 1
    song.save
    render json: song
  end

  private 

  def playlist
    @playlist ||= Playlist.find(params[:id])
  end

  def playlist_params
    playlist_hash = params.require(:playlist).permit(:name, :type)
    playlist_hash[:user_id] = params[:current_user_id]
    playlist_hash[:_type] = playlist_hash.delete(:type)
    playlist_hash
  end
end
