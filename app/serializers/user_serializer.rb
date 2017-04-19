class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :nick_name, :email, :is_friend, 
             :invitation_present
  has_many :friends

  def id
    object._id.to_s
  end

  def friends
    if @instance_options[:current_user_id] == id
      object.friends
    else
      []
    end
  end

  def is_friend
    current_user.friend_ids.map(&:to_s).include?(id)
  end

  def invitation_present
    Invitation.or([
      { sender_id: id, receiver_id: current_user.id }, 
      { sender_id: current_user.id, receiver_id: id }
    ]).present?
  end

  def sent_invitation
    current_user.sent_invitations.map { |i| i.receiver_id.to_s }.include?(id)
  end
end
