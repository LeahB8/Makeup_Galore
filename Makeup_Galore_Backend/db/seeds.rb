User.delete_all
Item.delete_all

leah = User.create(username: 'LeahB')

cloudPaint = Item.create(name: "Cloud Paint", product_link: "https://www.glossier.com/products/cloud-paint", product_type: "blush", image_link: "https://i.ebayimg.com/images/g/UAMAAOSwbrZcdN31/s-l1600.jpg", brand: "glossier", price: 22.0, description: "With Cloud Paint, we set out to make blush the high point of your routine. The pillowy, gel-cream formula is designed to be the most user-friendly cheek color in existence. If you can finger paint, you can Cloud Paint—simply dab it onto cheeks wherever you please. It’s seamless, sheer, and buildable (i.e. it’s hard to accidentally apply too much). Inspired by gradient pink NYC sunsets, the shades are optimized to work across a wide range of skin tones for a healthy, flushed-from-within glow.", user_id: 6, quantity: 1)


# require_relative "get.rb"
# // Require the file where you created your get class

# First 1000 games
# i = 0
# 968.times do |i|
# //i starts at 0 and is the equivalent to your 'id' attribute, this will let you hit the endpoint for each indiviudal item
#   i += 1
#   Game.create(Get.get_game(i))
#   // Create a new entry in your database
#   sleep(1)
#   //If your API has bandwith restrictions e.g. you can only query the API once every 10 seconds, then have a delay between each call using sleep
# end