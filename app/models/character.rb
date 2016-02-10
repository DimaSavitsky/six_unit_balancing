class Character < ActiveRecord::Base

  belongs_to :game

  validates :name, { presence: true, uniqueness: { scope: :game } }

end
