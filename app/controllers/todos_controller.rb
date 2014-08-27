class TodosController < ApplicationController
  def index
    @todo = Todo.new
    @todos = Todo.all
    # respond_to do |format|
    #   # format.html { render :text => "hello"}
    #   format.json { render :json => @todos}


  end

  def create
    puts "*" * 80
    puts params
    puts "*" * 80
    @todo = Todo.new(
      :todo => params[:todo][:todo]
    )

    if @todo.save
      redirect_to :show

    else
      redirect_to :show
    end
  end
end