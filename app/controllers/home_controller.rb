class HomeController < ApplicationController

  layout "landing_page_layout", only: [:preschool_farm_fun, :ios_for_parents]

  def index
    # @posts = Post.publisheds.order("published_at DESC").limit(4)
    @posts = Post.featured_posts.limit(4)
  end

  def about

  end

  def preschool_farm_fun

  end

  def privacy_policy

  end

  def ios_for_parents

  end

end
