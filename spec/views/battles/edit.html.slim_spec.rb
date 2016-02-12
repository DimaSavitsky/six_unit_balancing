require 'rails_helper'

RSpec.describe "battles/edit", type: :view do
  before(:each) do
    @battle = assign(:battle, Battle.create!(
      :game_id => 1
    ))
  end

  it "renders the edit battle form" do
    render

    assert_select "form[action=?][method=?]", battle_path(@battle), "post" do

      assert_select "input#battle_game_id[name=?]", "battle[game_id]"
    end
  end
end
