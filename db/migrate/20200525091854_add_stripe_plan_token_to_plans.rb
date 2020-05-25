class AddStripePlanTokenToPlans < ActiveRecord::Migration[5.0]
  def change
    add_column :plans, :stripe_plan_token, :string
  end
end
