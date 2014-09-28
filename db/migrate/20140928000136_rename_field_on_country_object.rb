class RenameFieldOnCountryObject < ActiveRecord::Migration
  def change
  	rename_column :countries, :country, :country
  end
end
