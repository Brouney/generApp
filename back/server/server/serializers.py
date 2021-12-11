from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']
        #to return in get - hide password
        extra_kwargs = {'password':{'write_only':True, 'required':True}}

    #adding with hashing
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

