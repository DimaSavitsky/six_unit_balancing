class CreateDeployments < ActiveRecord::Migration
  def change
    create_table :deployments do |t|
      t.references :battle
      t.references :character
    end
  end
end
