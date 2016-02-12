class Battle < ActiveRecord::Base

  belongs_to :game
  has_many :deployments
  has_many :characters, through: :deployments

  validates :characters, presence: true

end
