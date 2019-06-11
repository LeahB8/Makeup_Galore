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
        user = User.create(username: params[:username])
            render json: user, include: [:items]
    end

end
