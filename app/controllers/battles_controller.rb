class BattlesController < ApplicationController
  load_and_authorize_resource :game
  load_and_authorize_resource :battle, through: :game


  def create
    @battle = @game.battles.new(battle_params)
    if @battle.save
      redirect_to game_path(@game)
    else
      render :new
    end
  end

  private

  def battle_params
    params.require(:battle).permit(character_ids: [])
  end
end
