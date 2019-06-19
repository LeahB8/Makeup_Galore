class ItemsController < ApplicationController

    def index
        items = Item.all
        render json: items
    end

    def show
        item = Item.find_by(id: params[:id])
        render json: item
    end

    def create
        item = Item.create(item_params)
            render json: item
    end

    def update
        item = Item.find_by(id: params[:id])
        if item
            item.update(item_params)
            render json: item
        end
    end

    def destroy
        item = Item.find_by(id: params[:id])
        if item 
            item.destroy
            render json: item
        else
            render json: {error: "Item doesn't exist"}
        end
    end

    private
    def item_params
        params.require(:item).permit(:name, :product_link, :product_type, :image_link, :brand, :price, :description, :user_id, :quantity)
    end

end
