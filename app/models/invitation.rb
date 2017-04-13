class Invitation
  include Mongoid::Document
  include Mongoid::Timestamps

  PENDING = 'pending'
  ACCEPTED = 'accepted'
  STATUSES = [
    PENDING,
    ACCEPTED
  ]
  
  field :status, type: String
  belongs_to :sender, inverse_of: :sent_invitations, class_name: 'User'
  belongs_to :receiver, inverse_of: :received_invitations, class_name: 'User'
  
  validates :sender_id, presence: true
  validates :receiver_id, presence: true
  validates_uniqueness_of :sender_id, scope: :receiver_id

  validates :status,
    presence: true,
    inclusion: { 
      in: STATUSES
    }

  def accept
    if(self.status == Invitation::PENDING)
      self.status = Invitation::ACCEPTED
      self.save
      self.sender.friends << self.receiver
      self.sender.save
    end
  end
end