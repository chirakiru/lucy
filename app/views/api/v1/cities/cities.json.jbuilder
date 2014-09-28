json.array! @cities do |city|
	json.city_id city.city_id
	json.name city.city
	json.description city.description
	json.reference city.reference
	json.latitude city.latitude
	json.longitude city.longitude
end