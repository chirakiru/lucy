json.array!(@pollutants) do |pollutant|
  json.extract! pollutant, :id, :hour, :station, :pm10, :03, :nO2, :sO2, :CO, :pm25
  json.url pollutant_url(pollutant, format: :json)
end
