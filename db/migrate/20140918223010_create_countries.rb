class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
      t.string :contry
      t.string :code
      t.string :description
      t.string :reference
      t.decimal :latitude, {:precision=>10, :scale=>6}
      t.decimal :longitude, {:precision=>10, :scale=>6}
      t.timestamps
    end
  end
end
