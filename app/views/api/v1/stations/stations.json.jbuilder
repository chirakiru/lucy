json.array! @stations do |station|
	json.station_id station.id
	json.name station.station
	json.code station.code
	json.description station.description
	json.reference station.reference
	json.notes station.notes
	json.latitude station.latitude
	json.longitude station.longitude
end