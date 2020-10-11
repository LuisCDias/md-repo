class CreateQuestionsTable < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.integer :qid
      t.string :subject
      t.string :system
      t.string :topic
      t.text :objective
    end
  end
end
