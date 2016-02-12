class Character < ActiveRecord::Base

  belongs_to :game

  has_many :deployments
  has_many :battles, through: :deployments

  validates :name, { presence: true, uniqueness: { scope: :game } }

end
