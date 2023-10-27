#!/bin/bash
# a simple bash script, created by chatgpt, to convert all png and jpg images to webp. useful when the webp plugin does not work (for example, in termux)
# Specify the folder containing the PNG and JPG files
input_folder="assets/images"

# Check if the cwebp tool is installed
if ! command -v cwebp &> /dev/null; then
    echo "cwebp is not installed. Please install WebP tools."
    exit 1
fi

# Loop through each file in the input folder
for file in "$input_folder"/*.{png,jpg}; do
    if [ -f "$file" ]; then
        # Get the base name of the file (without extension)
        base_name=$(basename "$file" | cut -d. -f1)

        # Convert the file to WebP format
        cwebp "$file" -o "$input_folder/$base_name.webp"
        
        if [ $? -eq 0 ]; then
            echo "Converted $file to $input_folder/$base_name.webp"
        else
            echo "Failed to convert $file"
        fi
    fi
done

echo "Conversion complete."
