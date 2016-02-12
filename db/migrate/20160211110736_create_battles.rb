class CreateBattles < ActiveRecord::Migration
  def change
    create_table :battles do |t|
      t.references :game

      t.timestamps null: false
    end
  end
end
