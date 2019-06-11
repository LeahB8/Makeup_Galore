class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.string :product_link
      t.string :product_type
      t.string :image_link
      t.string :brand
      t.decimal :price
      t.text :description
      t.integer :user_id

      t.timestamps
    end
  end
end
