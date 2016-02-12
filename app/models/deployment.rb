class Deployment < ActiveRecord::Base

  belongs_to :character
  belongs_to :battle

end
