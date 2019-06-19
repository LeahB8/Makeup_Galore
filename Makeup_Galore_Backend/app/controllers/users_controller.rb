class UsersController < ApplicationController
    def index
        users = User.all
        render json: users, include: :items
    end

    def show
        user = User.find_by(id: params[:id].to_i)
        render json: user, include: :items
    end


    # def items
    #     user = User.find_by(username: params[:username])
    #     render json: user.items
    # end

    def create
        user = User.create(user_params)
            render json: user, include: [:items]
    end


    private
    def user_params
        params.require(:user).permit(:username, :card_number, :cvc_number, :expiry_month, :expiry_year, :cardholders_name, :cardholders_postcode)
    end

end
