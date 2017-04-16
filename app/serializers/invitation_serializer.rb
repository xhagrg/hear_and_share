class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :message

  def id
    object._id.to_s
  end
end
