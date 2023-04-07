from django.shortcuts import render
from django.http import JsonResponse
from .models import Conversion
import json

# Create your views here.

def pound_to(pound_var, to_var):
    
    conversion_table = Conversion.objects.all()[0]
    if to_var == "T":
        return pound_var * conversion_table.pound_to_ton

    elif to_var == "g":
         return pound_var * conversion_table.pound_to_gram

    elif to_var == "t_oz":
        return pound_var * conversion_table.pound_to_troy

    elif to_var == "kg":
        return pound_var * conversion_table.pound_to_kilogram

    elif to_var == "lb":
        return pound_var

    elif to_var == "oz":
        return pound_var * conversion_table.pound_to_ounce

    else:
        raise ValueError("There is no conversion for type" +to_var)

def do_conversion(to_var, from_var, value):

    conversion_table = Conversion.objects.all()[0]
    #convert value to a lbs value
    
    pound_value = 0.0
    if from_var == "T":
        pound_value = value / conversion_table.pound_to_ton

    elif from_var == "g":
        pound_value = value / conversion_table.pound_to_gram

    elif from_var == "t_oz":
        pound_value = value / conversion_table.pound_to_troy
    
    elif from_var == "kg":
        pound_value = value / conversion_table.pound_to_kilogram
 
    elif from_var == "lb":
        pound_value = value

    elif from_var == "oz":
        pound_value = value / conversion_table.pound_to_ounce

    else:
        raise ValueError("There is no conversion for type" +from_var)
    
    return pound_to(pound_value, to_var)

def convert(request):
    try: 
        to_var = request.GET.get("to")
        from_var = request.GET.get('from')
        value = float(request.GET.get('value'))
        
        converted_value = do_conversion(to_var, from_var, value)
        return_dict = {}
        return_dict['units'] = to_var
        return_dict['value'] = converted_value
        return JsonResponse(return_dict)
    except:
        return JsonResponse({"error":"Invalid unit conversion request"})
