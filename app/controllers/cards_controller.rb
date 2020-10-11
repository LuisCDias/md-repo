class CardsController < ApplicationController
  def index
    @subjects = Question.pluck(:subject).uniq
    @systems = Question.where(subject: params[:subject]).pluck(:system).uniq if params[:subject]
    @topics = Question.where(subject: params[:subject], system: params[:system]).pluck(:topic).uniq if params[:subject] && params[:system]
  end
end
