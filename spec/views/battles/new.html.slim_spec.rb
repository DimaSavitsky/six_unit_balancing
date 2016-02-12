require 'rails_helper'

RSpec.describe "battles/new", type: :view do
  before(:each) do
    assign(:battle, Battle.new(
      :game_id => 1
    ))
  end

  it "renders new battle form" do
    render

    assert_select "form[action=?][method=?]", battles_path, "post" do

      assert_select "input#battle_game_id[name=?]", "battle[game_id]"
    end
  end
end
