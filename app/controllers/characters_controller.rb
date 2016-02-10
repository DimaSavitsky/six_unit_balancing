class CharactersController < ApplicationController
  load_and_authorize_resource :game
  load_and_authorize_resource :character, through: :game


  def create
    @character = @game.characters.new(character_params)
    if @character.save
      redirect_to game_path(@game)
    else
      render :new
    end
  end

  def update
    if @character.update(character_params)
      redirect_to game_path(@game)
    else
      render :edit
    end
  end

  private

  def character_params
    params.require(:character).permit(:name)
  end


end
