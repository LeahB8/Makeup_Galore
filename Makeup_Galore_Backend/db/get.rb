require "rest-client"
require "json"
require "pry"

Url = 'http://makeup-api.herokuapp.com/api/v1/products.json'

class Get
  def self.get_item
#   // Takes an optional parameter of id
    item_hash = {}
    # // Make an empty object to store all the relevant data in
    item_array = RestClient.get(Url)
    item_array.each do |item|
        item
    # // Fetch the data ^^
    item_data = JSON.parse(item)
    # // Interpre the JSON
    if item.price != 0.0 || null && item.description != null && item.brand != null
        item_hash[:name] = item_data['items'][0]['name']
        item_hash[:product_link] = item_data['items'][0]['product_link']
        item_hash[:product_type] = item_data['items'][0]['product_type']
        item_hash[:image_link] = item_data['items'][0]['image_link']
        item_hash[:brand] = item_data['items'][0]['brand']
        item_hash[:description] = item_data['items'][0]['description']


        # //Set any conditionals e.g. if (!item.price == 0.0 || null)
        # item_hash[:moby_id] = item_data["items"][0]["item_id"]
        # item_hash[:title] = item_data["items"][0]["title"]
        # item_data["items"][0]["sample_cover"] ? item_hash[:image] = item_data["items"][0]["sample_cover"]["image"] : item_hash[:image] = "/Users/mani/Development/code/Bootcamp/Final Project/item-drive/storage/No Cover art.png"
        # //Make any adjustments to the data structure you need
    end 

    item_hash
    # // Return the object
  end
end
