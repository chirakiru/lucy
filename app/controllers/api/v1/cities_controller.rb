class Api::V1::CitiesController < ApplicationController
  def cities
    @cities = City.all

    respond_to do |format|
      format.json
    end
  end
end