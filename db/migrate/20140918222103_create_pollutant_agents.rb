class CreatePollutantAgents < ActiveRecord::Migration
  def change
    create_table :pollutant_agents do |t|
      t.string :pollutant_agent
      t.string :code
      t.string :psi
      t.string :description
      t.string :page
      t.string :reference

      t.timestamps
    end
  end
end
