from django.db import models

# Create your models here.
class Car(models.Model):
    car_id = models.AutoField(primary_key=True)
    car_year = models.IntegerField()
    car_make = models.CharField(max_length=200)
    car_model = models.CharField(max_length=200)
    car_comments = models.TextField()
    car_image = models.ImageField(upload_to="images/",default="")
    car_isFlagged = models.BooleanField(default=False)
    price_type = models.CharField(max_length=200)
    price_dap =  models.IntegerField()
    price_egc = models.IntegerField()
    price_advertised = models.IntegerField()
    contact_name = models.CharField(max_length=200)
    contact_number = models.CharField(max_length=200)
    contact_email = models.CharField(max_length=200)
    dealer_abn = models.CharField(max_length=200,default=0)
    user_id = models.IntegerField()


class User(models.Model):

    user_id = models.AutoField(primary_key=True)
    user_username = models.CharField(max_length=200)
    user_password = models.CharField(max_length=200)
    user_name = models.CharField(max_length=200)
    user_number = models.CharField(max_length=200)
    user_email = models.CharField(max_length=200)
    user_abn = models.CharField(max_length=200)

class Enquiry(models.Model):

    enquiry_id = models.AutoField(primary_key=True)
    enquiry_email = models.CharField(max_length=200)
    enquiry_content = models.CharField(max_length=200)
    enquiry_type = models.CharField(max_length=200)
    user_id = models.IntegerField()
