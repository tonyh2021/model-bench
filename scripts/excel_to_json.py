import sys
import pandas as pd
import json

if len(sys.argv) < 2:
    print("Usage: python excel_to_json.py <filename.xlsx>")
    sys.exit(1)

excel_file = sys.argv[1]

# Read all sheets
sheets = pd.read_excel(excel_file, sheet_name=None)  # Returns a dictionary {sheet_name: DataFrame}

# Combine all sheet data into one large DataFrame
combined_df = pd.concat(sheets.values(), ignore_index=True)

# Convert 'id' column to string type if it exists
if 'id' in combined_df.columns:
    combined_df['id'] = combined_df['id'].astype(str)

# Output as JSON
print(combined_df.to_json(orient='records', indent=2, force_ascii=False))