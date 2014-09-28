class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities, :id => false do |t|  
      t.column :city_id, 'serial NOT NULL PRIMARY KEY'  
      t.string :city

      t.timestamps
    end

    change_table :pollutants do |t|
      t.integer :city_id
    end


    add_foreign_key(:cities, :pollutants, column: 'city_id')
  end
end
