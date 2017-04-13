class Api::V1::Playlists < Api::V1::ApiBaseController
  before_filter :playlist, except: [:index, :create]
  def index
    query = { user_id: params[:user_id] }
    if(params[:current_user_id] != params[:user_id])
      query[:_type] = 'PublicPlaylist'
    end
    @playlists = Playlist.where(query)
  end

  def create
    @playlist = Playlist.new(playlist_params)
    @playlist.save
  end

  def show
  end

  def destroy
    if playlist.user_id == params[:current_user_id]
      playlist.delete
    end
  end

  def update
    if(params[:url] && playlist.user_id == params[current_user_id])
      playlist.add_song(params[:url])
    elsif(params[:name])
      playlist.update_attributes(name: playlist_params[:name])
    end
  end

  private 

  def playlist
    @playlist ||= Playlist.find(params[:id])
  end

  def playlist_params
    playlist_hash = params.require(:playlist).permit(:name)
    playlist_hash[:user_id] = params[:current_user_id]
    playlist_hash
  end
end
