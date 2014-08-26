class ChangePollutantObject < ActiveRecord::Migration
  def change
    drop_table :pollutants
    create_table :pollutants do |t|
      t.datetime :hour
      t.float :station
      t.float :pm10
      t.float :O3
      t.float :nO2
      t.float :sO2
      t.float :CO
      t.float :pm25

      t.timestamps
    end

    add_index :pollutants, [:hour, :station], :unique => true, :name => 'by_hour_station'
  end
end
