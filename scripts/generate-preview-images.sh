#!/usr/bin/env bash
# Generate 250px-tall previews for every image under public/images/full.
set -euo pipefail
cd "$(dirname "$0")/.."

find public/images/full/ -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0 |
while IFS= read -r -d '' img; do
	out=public/images/preview/${img#public/images/full/}
	mkdir -p "$(dirname "$out")"
	echo "Resizing: $img"
	magick "$img" -resize x250 -strip -quality 100 "$out"
done
echo "Resizing complete!"
