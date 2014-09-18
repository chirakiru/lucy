# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140918223010) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cities", primary_key: "city_id", force: true do |t|
    t.string   "city"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "description"
    t.string   "reference"
    t.decimal  "latitude",    precision: 10, scale: 6
    t.decimal  "longitude",   precision: 10, scale: 6
  end

  create_table "countries", force: true do |t|
    t.string   "contry"
    t.string   "code"
    t.string   "description"
    t.string   "reference"
    t.decimal  "latitude",    precision: 10, scale: 6
    t.decimal  "longitude",   precision: 10, scale: 6
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pollutant_agents", force: true do |t|
    t.string   "pollutant_agent"
    t.string   "code"
    t.string   "psi"
    t.string   "description"
    t.string   "page"
    t.string   "reference"
    t.decimal  "latitude",        precision: 10, scale: 6
    t.decimal  "longitude",       precision: 10, scale: 6
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pollutants", force: true do |t|
    t.datetime "hour"
    t.string   "station"
    t.float    "pm10"
    t.float    "O3"
    t.float    "nO2"
    t.float    "sO2"
    t.float    "CO"
    t.float    "pm25"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "city_id"
  end

  add_index "pollutants", ["hour", "station"], name: "by_hour_station", unique: true, using: :btree

  create_table "stations", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "station"
    t.string   "code"
    t.string   "description"
    t.string   "reference"
    t.string   "notes"
    t.decimal  "latitude",    precision: 10, scale: 6
    t.decimal  "longitude",   precision: 10, scale: 6
  end

  add_foreign_key "cities", "pollutants", name: "cities_city_id_fk", column: "city_id"

end
