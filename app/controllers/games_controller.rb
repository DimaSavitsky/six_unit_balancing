class GamesController < ApplicationController
  load_and_authorize_resource

  def create
    @game = Game.new(game_params)
    if @game.save
      redirect_to games_path
    else
      render :new
    end
  end

  def destroy
    @game.destroy
    redirect_to games_path
  end

  def world
    @game = Game.find(params[:id])
  end


  private

  def game_params
    params.require(:game).permit(:name)
  end

end
