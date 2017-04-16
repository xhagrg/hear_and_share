class Api::V1::UsersController < Api::V1::ApiBaseController
  def index
    @users = if(params[:query]) 
               User.search(params[:query])
             else
               User.all
             end
    render json: @users
  end

  def show
    @user = User.where(id: params[:id]).last
    render json: @user
  end
end