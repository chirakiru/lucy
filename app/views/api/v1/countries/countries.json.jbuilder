json.array! @countries do |country|
	json.country_id country.id
	json.name country.country
	json.description country.description
	json.reference country.reference
	json.latitude country.latitude
	json.longitude country.longitude
end