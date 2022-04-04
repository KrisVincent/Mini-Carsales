from collections import OrderedDict

from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Car,User
from .serializer import CarSerializer,UserSerializer,EnquirySerializer
import random


def random_generator():
    number = random.randint(11111111111, 99999999999)

    return number

# Create your views here.
class CarViewSet(viewsets.ViewSet):

    def list(self,request,):
        cars = Car.objects.all()
        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)


    def create(self,request):
        serializer = CarSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):

        cars = Car.objects.filter(user_id=pk)
        serializer = CarSerializer(cars, many=True)

        return Response(serializer.data)

    def update(self, request, pk=None):
        try:

            cars = Car.objects.get(car_id=pk)
            serializer = CarSerializer(cars, data=request.data)

            if serializer.is_valid():
                print("saved")
                serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Car.DoesNotExist:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        try:
            car = Car.objects.get(pk=pk)
        except Car.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CarSerializer(car, data= request.data, partial=True)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):

        car = Car.objects.get(car_id=pk)
        car.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

class UserViewSet(viewsets.ViewSet):

    def list(self,request,):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)


    def create(self,request):


        #this is for username checking if its already existing

        user = User.objects.filter(user_username=request.data["user_username"])
        email = User.objects.filter(user_email=request.data["user_email"])
        abn = User.objects.values_list('user_abn', flat=True)

        abn_number = random_generator()

        while abn_number in abn:

            abn_number = random_generator()

        data = OrderedDict()
        data.update(request.data)
        data['user_abn'] = str(abn_number)

        serializer = UserSerializer(data=data)

        if len(user) > 0 or len(email) > 0:
            return Response("Username or Email Already Exists",status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):

        user = User.objects.filter(user_id=pk)
        serializer = UserSerializer(user, many=True)

        return Response(serializer.data)

    def update(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user, data = request.data)

        if serializer.is_valid():

            serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):

        user = User.objects.get(pk=pk)
        user.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

class EnquiryViewSet(viewsets.ViewSet):


    def create(self,request):
        serializer = EnquirySerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    if request.method == "POST":

        try:

            username = request.data["user_username"]
            password = request.data["user_password"]

            user = User.objects.get(user_username=username)

            if username == user.user_username and user.user_password == password:
                return Response(user.user_id, status=status.HTTP_200_OK)



        except Exception:
            return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def searchCars(request):

    if request.method == "POST":

        try:

            category = request.data["category"]
            search = request.data["search"]

            if category == "Year":

                car = Car.objects.filter(car_year__contains = search)

            elif category == "Model":

                car = Car.objects.filter(car_model__contains = search)

            elif category == "Make":

                car = Car.objects.filter(car_make__contains=search)


            serializer = CarSerializer(car, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)



        except Exception:
            return Response(status=status.HTTP_404_NOT_FOUND)



        except Exception:
            return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def sendEmail(request):
    if request.method == "POST":
        try:
            subject = request.data["subject"]
            message = request.data["message"]
            recipient = request.data["recipient"]

            send_mail(subject, message, settings.EMAIL_HOST_USER, [recipient], fail_silently=False)

            return Response(status=status.HTTP_200_OK)

        except Exception as e:

            return Response(status=status.HTTP_400_BAD_REQUEST)