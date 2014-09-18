class AddAditionalsFieldOnStations < ActiveRecord::Migration
  def change
    add_column :stations, :station, :string
    add_column :stations, :code , :string
    add_column :stations, :description , :string
    add_column :stations, :reference , :string
    add_column :stations, :notes , :string
    add_column :stations, :latitude, :decimal, {:precision=>10, :scale=>6}
    add_column :stations, :longitude, :decimal, {:precision=>10, :scale=>6}
  end
end
