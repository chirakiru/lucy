require 'test_helper'

class PollutantsControllerTest < ActionController::TestCase
  setup do
    @pollutant = pollutants(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:pollutants)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create pollutant" do
    assert_difference('Pollutant.count') do
      post :create, pollutant: { 03: @pollutant.03, CO: @pollutant.CO, hour: @pollutant.hour, nO2: @pollutant.nO2, pm10: @pollutant.pm10, pm25: @pollutant.pm25, sO2: @pollutant.sO2, station: @pollutant.station }
    end

    assert_redirected_to pollutant_path(assigns(:pollutant))
  end

  test "should show pollutant" do
    get :show, id: @pollutant
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @pollutant
    assert_response :success
  end

  test "should update pollutant" do
    patch :update, id: @pollutant, pollutant: { 03: @pollutant.03, CO: @pollutant.CO, hour: @pollutant.hour, nO2: @pollutant.nO2, pm10: @pollutant.pm10, pm25: @pollutant.pm25, sO2: @pollutant.sO2, station: @pollutant.station }
    assert_redirected_to pollutant_path(assigns(:pollutant))
  end

  test "should destroy pollutant" do
    assert_difference('Pollutant.count', -1) do
      delete :destroy, id: @pollutant
    end

    assert_redirected_to pollutants_path
  end
end
