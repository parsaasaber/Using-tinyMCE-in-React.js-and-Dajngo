from django.contrib.auth.models import User
from django.http import JsonResponse
from . import models
import json
import base64
import re
import os

# Create your views here.

def view(request):
    return JsonResponse({"error":0, "message":"succesful", "data":[{"id":item.id, "name":item.name, "description":item.description} for item in models.Item.objects.all()]})

def create(request):
    data = json.loads(request.body.decode("utf-8"))

    name = data["name"]
    description = data["description"]
    
    def replacement_function(match):  
        nonlocal num  
        src = match.group(1)

        with open(f'./media/{name}_des{num}.png', 'wb') as f:  
            image_data = base64.b64decode(src.split(",")[1])  
            f.write(image_data)  
        
        new_src = f"http://127.0.0.1:8000/app/media/{name}_des{num}.png"  
        num += 1  
        return f'<img src="{new_src}"'  

    num = 0  
    new_description = re.sub(r'<img src="([^"]+)"', replacement_function, description)  

    models.Item.objects.create(
        name=name,
        description = new_description
    )
    
    return JsonResponse({"error":0, "message":"created succesfully"})


def edit(request, id):
    data = json.loads(request.body.decode("utf-8"))

    name = data["name"]
    description = data["description"]
    srcs = [src.split("http://127.0.0.1:8000/app/media/")[1] for src in re.findall(r'<img src="([^"]+)"', description) if src.startswith("http://127.0.0.1:8000")]  
    print(srcs)
    
    for file in os.listdir("./media"):
        if file.startswith(name) and file not in srcs:
            os.remove(f"./media/{file}")

    def replacement_function(match):  
        nonlocal num    

        src = match.group(1)
        if src.startswith("http://127.0.0.1:8000"):
            return f'<img src="{src}"'  

        with open("./app/1.txt", "wt") as f:
            f.write(src)  

        with open(f'./media/{name}_des{num}.png', 'wb') as f:  
            image_data = base64.b64decode(src.split(",")[1])  
            f.write(image_data)  
        
        new_src = f"http://127.0.0.1:8000/app/media/{name}_des{num}.png"  
        num += 1  
        return f'<img src="{new_src}"'  

    num = 0  
    new_description = re.sub(r'<img src="([^"]+)"', replacement_function, description)  

    models.Item.objects.filter(
        id=id
    ).update(
        name=name,
        description = new_description
    )
    
    return JsonResponse({"error":0, "message":"created succesfully"})