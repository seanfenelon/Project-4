from flask import Blueprint, request
from models.user import User
from serializers.user import UserSchema
from marshmallow import ValidationError

user_schema = UserSchema()

router = Blueprint(__name__, 'users')

@router.route('/register', methods=['POST'])
def register():
  request_body = request.get_json()
  user = user_schema.load(request_body)
  user.save()
  return user_schema.jsonify(user), 200

@router.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  user = User.query.filter_by(email=data['email']).first()

  if not user:
    return { 'message': 'Unauthorized Login Attempt' }

  if not user.validate_password(data['password']):
    return { 'message': 'Unauthorized Login Attempt' }

  token = user.generate_token()

  return { 'token': token, 'message': 'Welcome back!' }, 200