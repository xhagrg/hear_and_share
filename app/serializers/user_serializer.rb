class UserSerializer < ActiveModel::Serializer
  attributes :name, :nick_name, :email

  def id
    object._id.to_s
  end
end
