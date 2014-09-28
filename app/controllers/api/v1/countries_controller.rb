class Api::V1::CountriesController < ApplicationController
  def countries
    @countries = Country.all

    respond_to do |format|
      format.json
    end
  end
end