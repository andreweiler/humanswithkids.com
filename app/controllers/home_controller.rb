class HomeController < ApplicationController
  def index
    @posts = Post.publisheds.order("published_at DESC").limit(2)
  end
  
  def about
    
  end
  
  def hire_me
    
  end
  
end
