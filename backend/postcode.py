import json

import azure.cosmos.cosmos_client as cosmos_client
import azure.cosmos.errors as errors
import azure.cosmos.http_constants as http_constants

import os

url = "https://hackdatadb.documents.azure.com:443/"
key = "XnzdHzA2ntyqvqTUC5QQnwvRaAHWVXzTSpKdmhK7p7hjSszwYbej7n2Ul4XcnmoRjV2vbuwW7E9uACDbmScWIA=="
client = cosmos_client.CosmosClient(url, {'masterKey': key})

inspection_db = client.get_database_client('inspectionData')
inspection_cont = inspection_db.get_container_client('Items')

def get_addresses(postcode):
    QUERY = "SELECT c[\"UPRN\"], c[\"Property Address\"] FROM c WHERE c[\"Property Address\"] LIKE @address"
    params = [dict(name="@address", value='%'+postcode)]
    inspection_query_result = inspection_cont.query_items(query=QUERY, parameters=params, enable_cross_partition_query=True)
    inspection_query_result = [item for item in inspection_query_result]
    addresses = []
    for result in inspection_query_result:
        addresses.append({"uprn": result["UPRN"], "address": result["Property Address"]})
    return addresses

