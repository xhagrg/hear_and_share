class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :message, :sender_name, :sender_id, :receiver_id

  def id
    object._id.to_s
  end

  def sender_name
    object.sender.name
  end
end
