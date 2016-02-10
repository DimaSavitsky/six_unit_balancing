class Game < ActiveRecord::Base

  has_many :characters

  validates :name, { presence: true, uniqueness: true }

end
