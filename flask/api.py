from flask import Flask, request, jsonify, json

import os
import sqlite3
from flask_sqlalchemy import SQLAlchemy
from datetime import date, datetime
import calendar

app = Flask(__name__)

# Add db details to config
app.config.from_object(__name__) 
app.config.update(dict(
    SQLALCHEMY_DATABASE_URI = 'sqlite:///'+os.path.join(app.root_path, 'test.db'),
    SECRET_KEY='development key',
	SQLALCHEMY_TRACK_MODIFICATIONS = False
))

#Get db
db = SQLAlchemy(app)

#Models to store diary entries
class Day(db.Model):
	"""
	Represents a day in the diary. A day can have multiple entries associated with it.
	"""
	id = db.Column(db.Integer, primary_key = True)
	date = db.Column(db.Date, nullable = False, unique = True, default=date.today())

	def __repr__(self):
		return '<Day %r>' % self.date.strftime('%d-%m-%Y')
	
class Entry(db.Model):
	"""
	Entry associated with a day.
	"""
	id = db.Column(db.Integer, primary_key = True)
	title = db.Column(db.String(120), nullable = False)
	text = db.Column(db.String(360), nullable = False)

	day_id = db.Column(db.Integer, db.ForeignKey('day.id'), nullable = False) 
	day = db.relationship('Day', backref = db.backref('entries', lazy = True))

	def __repr__(self):
		return '<Day %r - %r>' % (self.day.date.strftime('%d-%m-%Y'), self.title)
		
	def serialize(self):
		return {
			'text' : self.text,
			'title' : self.title,
			'day': self.day.date.strftime('%d-%m-%Y')
		}

############################################################
# 
# API definitions for day
#		
############################################################
@app.route('/day', methods=['GET'])
def get_day():
	my_day = db.session.query(Day).all()
	return jsonify(day = my_day)	
	
	
@app.route('/entry', methods=['GET', 'POST'])
def manage_entries():
	if request.method == 'POST':
		if request.get_json() is not None: 
			# Read inputs 
			my_day = datetime.strptime(request.get_json().get("date", None), "%Y-%M-%d").date()
			my_title = request.get_json().get("title", None)
			my_text = request.get_json().get("text", None)
			
			# Error if any parameter is missing
			if my_day is None or my_title is None or my_text is None:
				response = jsonify(error = "Parameter error")
				response.status_code = 400
				return response		
				
			# Create day if it does not already exist
			my_db_day = db.session.query(Day).filter_by(date = my_day)		
			if my_db_day.count() != 0:
				my_day = my_db_day.first()
			else: 
				my_day = Day(date = my_day)
			
			# Create entry using the day
			db.session.add(Entry(title = my_title, text = my_text, day = my_day))
			db.session.commit()
			
			# Return success
			response = jsonify(success = True)
			response.status_code = 200
			return response
	elif request.method == 'GET':
		my_entries = []
		if request.args.get('date', None) is not None: 
			my_day = datetime.strptime(request.args.get('date', None), "%Y-%M-%d").date()
		
			# Check for input date
			if my_day is None:
				response = jsonify(error = "Parameter error")
				response.status_code = 400
				return response, {'Access-Control-Allow-Origin': '*'} 		

			# Get entries if they exist
			my_day = db.session.query(Day).filter_by(date = my_day).first()
			if my_day is not None:
				my_entries = my_day.entries
				
			return jsonify(entries = [entry.serialize() for entry in my_entries]), 200, {'Access-Control-Allow-Origin': '*'} 	
			
		else:
			response = jsonify(error = "Parameter error")
			response.status_code = 400
			return response,{'Access-Control-Allow-Origin': '*'} 		
		
def init_db():
    db.create_all()

@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    init_db()
    print('Initialized the database.')


if __name__ == '__main__':
	app.run(debug=True)
	
	