class CreatePollutants < ActiveRecord::Migration
  def change
    create_table :pollutants do |t|
      t.datetime :hour
      t.string :station
      t.string :pm10
      t.string :O3
      t.string :nO2
      t.string :sO2
      t.string :CO
      t.string :pm25

      t.timestamps
    end
  end
end
