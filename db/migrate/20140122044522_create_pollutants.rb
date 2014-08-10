class CreatePollutants < ActiveRecord::Migration
  def change
    create_table :pollutants do |t|
      t.Datetime :hour
      t.String :station
      t.String :pm10
      t.String :03
      t.String :nO2
      t.String :sO2
      t.String :CO
      t.String :pm25

      t.timestamps
    end
  end
end
