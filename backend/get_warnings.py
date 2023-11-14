import json

import azure.cosmos.cosmos_client as cosmos_client
import azure.cosmos.errors as errors
import azure.cosmos.http_constants as http_constants

import os
#100062285951 - 52 y
#48028039
url = "https://hackdatadb.documents.azure.com:443/"
key = "XnzdHzA2ntyqvqTUC5QQnwvRaAHWVXzTSpKdmhK7p7hjSszwYbej7n2Ul4XcnmoRjV2vbuwW7E9uACDbmScWIA=="
client = cosmos_client.CosmosClient(url, {'masterKey': key})

property_db = client.get_database_client('epcEnglandWales')
property_cont = property_db.get_container_client('Items')

inspection_db = client.get_database_client('inspectionData')
inspection_cont = inspection_db.get_container_client('Items')

def get_warnings(uprn):
    QUERY = "SELECT * FROM c WHERE c.UPRN = @UPRN"
    params = [dict(name="@UPRN", value=uprn)]
    epc_query_result = property_cont.query_items(query=QUERY, parameters=params, enable_cross_partition_query=True)
    epc_query_result = [item for item in epc_query_result]
    inspection_query_result = inspection_cont.query_items(query=QUERY, parameters=params, enable_cross_partition_query=True)
    inspection_query_result = [item for item in inspection_query_result]

    if len(epc_query_result) == 0:
        print("No EPC data found")
        return False, "No EPC data found"
    if len(inspection_query_result) == 0:
        print("No inspection data found")
        return False, "No inspection data found"

    epc_data = epc_query_result[0]
    inspection_data = inspection_query_result[0]
    warnings = []
    # Check if the property is of a non-traditional construction type
    if inspection_data["Is non traditional construction type"] == "yes":
        # Unacceptable construction types
        const_type = inspection_data["Please select the appropriate construction type for the property's main walls"]
        # Rule 1: Timber or metal framed buildings where the cavity, between frame & cladding, has been retrospectively filled with an insulation material
        if const_type in ["Timber Frame or Kit Build", "Steel Framed"] and "Cavity wall, filled cavity" in inspection_data["WallTypeDescription"]:
            warnings.append({"type": "RED", "title": "Unacceptable construction type", "description": "Timber or metal framed buildings where the cavity, between frame & cladding, has been retrospectively filled with an insulation material"})
        else:
            warnings.append({"type": "AMBER", "title": "Non-traditional construction type", "description": f"The property was classified as: {const_type}"})

    # Property tenure
    # Unexpired Term of lease
    if inspection_data["Tenure"] == "Leasehold" and int(inspection_data["Unexpired Term of lease"].split(" ")[0]) < 70:
        warnings.append({"type": "AMBER", "title": "Lease is less than 70 years", "description": f"The property has an unexpired term of lease of {inspection_data['Unexpired Term of lease']}."})

    # Flooding risk
    if "Saleability affected" in inspection_data["flooding affect"]:
        warnings.append({"type": "AMBER", "title": "Saleability affected by flooding", "description": "The valuation is affected by flooding."})
    elif inspection_data["flooding affect"] == "Severity renders property unsuitable for mortgage lending purposes":
        warnings.append({"type": "RED", "title": "Property unsuitable for mortgage lending purposes", "description": "The valuation is affected by flooding."})
    elif inspection_data["flooding affect"] == "Structural report required":
        warnings.append({"type": "AMBER", "title": "Structural report required", "description": "A structural report is required due to flooding."})

    # Flooding history
    if inspection_data["Are you aware the property has previously flooded?"].lower() == "yes":
        warnings.append({"type": "AMBER", "title": "Property has previously flooded", "description": "The property has previously flooded."})
    elif inspection_data["Is there any reason to believe the property may be at risk of flooding?"].lower() == "yes":
        warnings.append({"type": "AMBER", "title": "Property may be at risk of flooding", "description": "The property may be at risk of flooding."})

    # Efficiency
    # RULE 1: Efficiency rating could be improved by 3 grades
    grades = list("ABCDEF")
    epc_efficiency = epc_data["CurrentRating"]
    epc_potential = epc_data["PotentialRating"]
    if grades.index(epc_efficiency) - grades.index(epc_potential) >= 3:
        warnings.append({"type": "GREEN", "title": f"Efficiency rating could be improved by {grades.index(epc_efficiency) - grades.index(epc_potential)} grades", "description": f"The property has a current efficiency rating of {epc_efficiency} and a potential rating of {epc_potential}."})

    print(json.dumps(inspection_data, indent=True))
    print(warnings)
    return True, warnings
