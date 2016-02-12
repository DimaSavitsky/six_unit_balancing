require 'rails_helper'

RSpec.describe "Battles", type: :request do
  describe "GET /battles" do
    it "works! (now write some real specs)" do
      get battles_path
      expect(response).to have_http_status(200)
    end
  end
end
