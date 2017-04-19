class User
  include Mongoid::Document
  include Mongoid::Timestamps
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  attr_accessor :login
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, 
         authentication_keys: [:login]

  ## Database authenticatable
  field :email,              type: String, default: ""
  field :encrypted_password, type: String, default: ""

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Rememberable
  field :remember_created_at, type: Time

  ## Trackable
  field :sign_in_count,      type: Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_ip,    type: String
  field :first_name,         type: String
  field :last_name,          type: String
  field :admin,              type: Boolean,    default: false
  field :nick_name,          type: String
  field :friend_id,          type: BSON::ObjectId

  validates :nick_name,
    presence: true,
    uniqueness: {
      case_sensitive: false
    }

  validate :validate_nickname

  has_many :playlists
  has_many :sent_invitations, inverse_of: :sender, class_name: 'Invitation'
  has_many :received_invitations, inverse_of: :receiver, class_name: 'Invitation'

  has_many :friends, inverse_of: :friend, class_name: 'User'

  ## Confirmable
  # field :confirmation_token,   type: String
  # field :confirmed_at,         type: Time
  # field :confirmation_sent_at, type: Time
  # field :unconfirmed_email,    type: String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, type: Integer, default: 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    type: String # Only if unlock strategy is :email or :both
  # field :locked_at,       type: Time

  def login=(login)
    @login = login
  end

  def login
    @login || self.nick_name || self.email
  end

  def name
    "#{self.first_name} #{self.last_name}"
  end

  def self.find_first_by_auth_conditions(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      self.search(login).first
    else
      super
    end
  end

  def self.search(query)
    self.any_of(
      { nick_name: /^#{Regexp.escape(query)}$/i }, 
      { email: /^#{Regexp.escape(query)}$/i }
    )
  end

  private
  def validate_nickname
    if User.where(email: self.nick_name).exists?
      errors.add(:nick_name, :invalid)
    end
  end
end
