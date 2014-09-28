class ChangeForeignKeyCitiesOnPolltants < ActiveRecord::Migration
  def change
  	remove_foreign_key(:cities, column: 'city_id')
  end
end
