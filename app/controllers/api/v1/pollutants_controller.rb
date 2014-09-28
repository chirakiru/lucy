class Api::V1::PollutantsController < ApplicationController
  def pollutants_agents
    @pollutants_agents = PollutantAgent.all

    respond_to do |format|
      format.json
    end
  end
end
