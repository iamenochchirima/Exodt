from rest_framework import serializers
from .models import UserProfile, Country

class ProfileSerializer(serializers.ModelSerializer):
    country_name = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = '__all__'

    def get_country_name(self, obj):
        country_id = obj.country_id
        try:
            country = Country.objects.get(id=country_id)
            return country.name
        except Country.DoesNotExist:
            return None

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'