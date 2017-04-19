class Api::V1::UsersController < Api::V1::ApiBaseController
  def index
    users = User.where(:id.ne => params[:current_user_id])
    @users = if(params[:query]) 
               users.search(params[:query])
             else
               users.all
             end
    render json: @users, current_user_id: params[:current_user_id]
  end

  def show
    @user = User.where(id: params[:id]).last
    render json: @user, current_user_id: params[:current_user_id]
  end
end