class CardsController < ApplicationController
  def index
    @subjects = subjects()
    @systems = systems()
    @topics = topics()
    @objectives = objectives()
  end

  private

  def subjects
    @subjects ||= Question.pluck(:subject).uniq
  end

  def systems
    return unless params[:subject]

    @systems ||= Question.where(subject: params[:subject]).pluck(:system).uniq
  end

  def topics
    return unless params[:subject] && params[:system]

    @topics ||= Question.where(subject: params[:subject], system: params[:system])
                .pluck(:topic).uniq
  end

  def objectives
    return unless params[:search] && params[:subject] && params[:system]

    query = { subject: params[:subject], system: params[:system] }
    query.merge!(topic: params[:topic]) if params[:topic] && params[:topic] != 'Topic'

    @objectives ||= Question.where(query).pluck(:objective)
  end
end
