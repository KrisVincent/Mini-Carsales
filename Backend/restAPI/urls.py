
from .views import CarViewSet,UserViewSet,EnquiryViewSet,login,searchCars,sendEmail
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from django.urls import path,include

router = DefaultRouter()
router.register('car',CarViewSet,basename='car')
router.register('user',UserViewSet,basename='user')
router.register('enquiry',EnquiryViewSet,basename='enquiry')


urlpatterns = [
    path('api/', include(router.urls)),
    path('login/', login),
    path('search/', searchCars),
    path('email/', sendEmail)


]
urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
