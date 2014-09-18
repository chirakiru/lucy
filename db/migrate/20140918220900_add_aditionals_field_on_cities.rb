class AddAditionalsFieldOnCities < ActiveRecord::Migration
  def change
    add_column :cities, :description, :string
    add_column :cities, :reference, :string
    add_column :cities, :latitude, :decimal, {:precision=>10, :scale=>6}
    add_column :cities, :longitude, :decimal, {:precision=>10, :scale=>6}
  end
end
