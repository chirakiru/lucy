class Api::V1::StationsController < ApplicationController
  def stations
    @stations = Station.all

    respond_to do |format|
      format.json
    end
  end
end
