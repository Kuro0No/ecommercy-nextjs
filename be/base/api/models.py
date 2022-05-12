import uuid
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


from base.user.models import User



# Create your models here.


class Category(models.Model):
    name = models.CharField(null=True,max_length=150)
    def __str__(self):
        return f"{self.name} "

class Colors(models.Model):
    name = models.CharField(null=True,max_length=150)
    def __str__(self):
        return f"{self.name}, {self.id} "

class TotalProducts(models.Model):
    seller = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    uuid = models.UUIDField(primary_key = True, default =uuid.uuid4, unique=True, editable=False)
    name = models.CharField(null=True, max_length=150)
    description = models.TextField(null=True,blank=True)
    image = models.FileField(upload_to='image',null=True)
    created = models.DateTimeField(auto_now_add = True, null=True)
    video = models.FileField(upload_to='video',null=True,blank=True)
    color = models.ManyToManyField(Colors, null=True)
    category = models.ForeignKey(Category, null=True, on_delete=models.CASCADE)
    price = models.FloatField(null=True)
    count_sold = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add = True, null=True)

    class Meta:   
        ordering = ['-created']

    def __str__(self):
        return self.name[0:50]



class Reviews(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    product_id = models.ForeignKey(TotalProducts, on_delete=models.CASCADE,null=True)
    content = models.TextField(null=True,max_length=150)
    rate  = models.IntegerField(null=True,validators=[MinValueValidator(1),MaxValueValidator(5)])
    created = models.DateTimeField(auto_now_add = True, null=True)
    def __str__(self):
        return f"{self.content[0:50]}, {self.rate} "



class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    product_id = models.ForeignKey(TotalProducts, on_delete=models.CASCADE,null=True)
    content = models.TextField(null=True,max_length=150)
    created = models.DateTimeField(auto_now_add = True, null=True)
    def __str__(self):
        return f"{self.content[0:50]}"

class RepComments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    comment_id =  models.ForeignKey(Comments, on_delete=models.CASCADE,null=True)
    content = models.TextField(null=True,max_length=150)
    created = models.DateTimeField(auto_now_add = True, null=True)
    def __str__(self):
        return f"{self.content[0:50]} "