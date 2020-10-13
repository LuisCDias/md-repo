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
    @systems ||= if has_param?(:subject)
      Question.where(subject: params[:subject]).pluck(:system).uniq
    else
      Question.all.pluck(:system).uniq
    end
  end

  def topics
    query = if has_param?(:subject) && has_param?(:system)
      Question.where(subject: params[:subject], system: params[:system])
    elsif has_param?(:subject)
      Question.where(subject: params[:subject])
    elsif has_param?(:system)
      Question.where(system: params[:system])
    else
      Question.all
    end

    @topics ||= query.pluck(:topic).uniq
  end

  def objectives
    return unless params[:search]

    query = if has_param?(:subject) && has_param?(:system) && has_param?(:topic)
      Question.where(subject: params[:subject], system: params[:system], topic: params[:topic])
    elsif has_param?(:subject) && has_param?(:system)
      Question.where(subject: params[:subject], system: params[:system])
    elsif has_param?(:system) && has_param?(:topic)
      Question.where(system: params[:system], topic: params[:topic])
    elsif has_param?(:subject) && has_param?(:topic)
      Question.where(subject: params[:subject], topic: params[:topic])
    elsif has_param?(:subject)
      Question.where(subject: params[:subject])
    elsif has_param?(:system)
      Question.where(system: params[:system])
    elsif has_param?(:topic)
      Question.where(topic: params[:topic])
    else
      Question.all
    end

    @objectives ||= query.pluck(:objective)
  end

  def has_param?(param)
    params[param] && params[param] != param.to_s.capitalize
  end
end
