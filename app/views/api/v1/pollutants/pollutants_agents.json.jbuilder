json.array! @pollutants_agents do |pollutant_agent|
	json.pollutants_agent_id pollutant_agent.id
	json.name pollutant_agent.pollutant_agent
	json.code pollutant_agent.code
	json.psi pollutant_agent.psi
	json.description pollutant_agent.description
	json.page pollutant_agent.page
	json.reference pollutant_agent.reference
end