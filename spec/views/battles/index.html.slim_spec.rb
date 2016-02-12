require 'rails_helper'

RSpec.describe "battles/index", type: :view do
  before(:each) do
    assign(:battles, [
      Battle.create!(
        :game_id => 1
      ),
      Battle.create!(
        :game_id => 1
      )
    ])
  end

  it "renders a list of battles" do
    render
    assert_select "tr>td", :text => 1.to_s, :count => 2
  end
end
