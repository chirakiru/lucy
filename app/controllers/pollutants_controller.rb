class PollutantsController < ApplicationController
  before_action :set_pollutant, only: [:show, :edit, :update, :destroy]

  # GET /pollutants
  # GET /pollutants.json
  def index
    @pollutants = Pollutant.all
  end

  # GET /pollutants/1
  # GET /pollutants/1.json
  def show
  end

  # GET /pollutants/new
  def new
    @pollutant = Pollutant.new
  end

  # GET /pollutants/1/edit
  def edit
  end

  # POST /pollutants
  # POST /pollutants.json
  def create
    @pollutant = Pollutant.new(pollutant_params)

    respond_to do |format|
      if @pollutant.save
        format.html { redirect_to @pollutant, notice: 'Pollutant was successfully created.' }
        format.json { render action: 'show', status: :created, location: @pollutant }
      else
        format.html { render action: 'new' }
        format.json { render json: @pollutant.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pollutants/1
  # PATCH/PUT /pollutants/1.json
  def update
    respond_to do |format|
      if @pollutant.update(pollutant_params)
        format.html { redirect_to @pollutant, notice: 'Pollutant was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @pollutant.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pollutants/1
  # DELETE /pollutants/1.json
  def destroy
    @pollutant.destroy
    respond_to do |format|
      format.html { redirect_to pollutants_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pollutant
      @pollutant = Pollutant.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pollutant_params
      params.require(:pollutant).permit(:hour, :station, :pm10, :O3, :nO2, :sO2, :CO, :pm25)
    end
end
