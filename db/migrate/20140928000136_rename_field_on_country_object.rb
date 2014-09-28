class RenameFieldOnCountryObject < ActiveRecord::Migration
  def change
  	rename_column :countries, :contry, :country
  end
end
