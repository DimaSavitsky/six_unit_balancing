class Game < ActiveRecord::Base

  has_many :characters
  has_many :battles

  validates :name, { presence: true, uniqueness: true }

end
