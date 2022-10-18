class Api::SeatingController < ApplicationController
  skip_before_action :verify_authenticity_token

  def generate
    response = generate_seating
    render json: response
  end

  private

  def generate_seating
    SeatingService
      .new(seating_params[:dimensions])
      .get_seating_arrangement(seating_params[:count])
  end

  def seating_params
    params.require(:seating).permit(:count, dimensions: %i[rows columns])
  end
end
