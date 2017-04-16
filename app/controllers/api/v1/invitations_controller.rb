class Api::V1::InvitationsController < Api::V1::ApiBaseController
  def index
    @invitations = Invitation.where(
      status: Invitation::PENDING, sender_id: params[:current_user_id]
    )
    render json: @invitations
  end

  def create
    friend_ids = current_user.friend_ids.map(&:to_s)
    if(friend_ids.exclude?(params[:user_id]) || params[:current_user_id] != params[:user_id])
      @invitation = Invitation.new(sender_id: params[:current_user_id], receiver_id: params[:user_id])
      @invitation.save
    end
    render json: @invitation
  end

  def show
    render json: invitation    
  end

  def destroy
    invitation&.delete
  end

  def update
    if(params[:accept])
      invitation.accept
    end
    render json: invitation
  end

  private 

  def invitation
    @invitation ||= Invitation.where(
      id: params[:id], 
      receiver_id: params[:current_user_id], 
      status: Invitation::Pending
    ).last    
  end

  def current_user
    @current_user ||= User.where(id: params[:current_user_id]).last
  end
end