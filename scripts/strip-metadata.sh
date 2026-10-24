#!/usr/bin/env bash
# Remove all EXIF/XMP/IPTC metadata (GPS, timestamps, camera) and Motion Photo
# video trailers from public/images. Pixels are untouched; ICC profiles stay.
# Deletes the Orientation tag too, so images must already be stored upright.
set -euo pipefail
cd "$(dirname "$0")/.."

find public/images/ -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0 |
while IFS= read -r -d '' img; do
	# A Motion Photo appends an MP4 after the JPEG; its XMP lists the length.
	video_len=$(exiv2 -K 'Xmp.Container.Directory[2]/Container:Item/Item:Length' -Pv "$img" 2>/dev/null || true)
	if [[ -n "$video_len" ]]; then
		echo "Removing video trailer: $img"
		truncate -s "-$video_len" "$img"
	fi
	exiv2 rm "$img"
done
echo "Metadata stripped"
