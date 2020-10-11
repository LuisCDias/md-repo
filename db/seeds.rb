# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'
require 'roo'

Question.delete_all

file = Roo::Spreadsheet.open('tmp/step2.xlsx')

puts "Starting to seed questions..."

subjects = ["Medicine", "Surgery", "Psychiatry", "Pediatrics", "Obstetrics & Gynecology"]
subjects.each do |subject|
  file.sheet(subject).each_with_index do |row, index|
    next if index.zero?
    qid, subject, system, topic, objective = row
    Question.create!( qid: qid, subject: subject, system: system, topic: topic, objective: objective)
  end
end

puts "Done inserting #{Question.count} questions"
