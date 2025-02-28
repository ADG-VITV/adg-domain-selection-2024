import json
import csv

# Sample JSON data
# json_data = {
#     "users": {
#         "John Doe 22BCIXXXX": {
#             "responses": {
#                 "managementDomain": {
#                     "editorial": {"assignmentLink": "asdasd"},
#                     "events": {"assignmentLink": "asdasd"},
#                     "finance": {"assignmentLink": "dasdad"}
#                 },
#                 "technicalDomain": {
#                     "android": {"assignmentLink": "dasda"},
#                     "blockchain": {"assignmentLink": "dasdas"},
#                     "design": {"assignmentLink": "asdasd"},
#                     "ios": {"assignmentLink": "dasd"},
#                     "ml": {"assignmentLink": "asdasd"},
#                     "web": {"assignmentLink": "asdas"}
#                 }
#             }
#         },
        
#     }
# }


json_filename = "input.json"  # Change this to your actual file name
with open(json_filename, "r") as json_file:
    json_data = json.load(json_file)

# Extract unique domain names for column headers
all_domains = set()

for details in json_data["users"].values():
    for domain_type, domains in details["responses"].items():
        for domain in domains.keys():
            col_name = f" {domain.capitalize()}"
            all_domains.add(col_name)

# Convert set to sorted list to maintain column order
all_domains = sorted(all_domains)

# Define CSV headers
headers = ["User"] + all_domains

# Prepare rows
rows = []
for user, details in json_data["users"].items():
    row_data = {header: "-" for header in all_domains}  # Default to "-"
    
    for domain_type, domains in details["responses"].items():
        for domain, domain_data in domains.items():
            col_name = f" {domain.capitalize()}"
            row_data[col_name] = domain_data.get("assignmentLink", "-")
    
    rows.append([user] + [row_data[col] for col in all_domains])

# Write to CSV
csv_filename = "formatted_output.csv"
with open(csv_filename, "w", newline="") as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(headers)  # Write headers
    writer.writerows(rows)    # Write data rows

print(f"CSV file '{csv_filename}' created successfully!")
