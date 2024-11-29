#!/bin/bash

resize_images() {
    local input_dir="${1:-.}"           # First argument or default to current dir
    local output_dir="${2:-./resized}"  # Second argument or default to ./resized
    local target_height="${3:-200}"     # Third argument or default to 200

    # Create output directory if it doesn't exist
    mkdir -p "$output_dir"

    # Process all image files
    for img in "$input_dir"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
        if [ -f "$img" ]; then
            filename=$(basename "$img")
            echo "Resizing: $filename"
            magick "$img" \
                -resize "x$target_height" \
                -quality 100 \
                "$output_dir/$filename"
        fi
    done
}

resize_images "../public/images/full/projects" "../public/images/preview/projects" 250
resize_images "../public/images/full/crossview" "../public/images/preview/crossview" 250

echo "Resizing complete!"
