#!/bin/bash
# ═══════════════════════════════════════════════════════
#  Westmount Presentation — Build Script
#  Compiles all sections + CSS + JS into a single
#  self-contained HTML file for delivery.
#
#  Usage:  bash build.sh
#  Output: build/westmount-final.html
# ═══════════════════════════════════════════════════════

set -e
mkdir -p build

OUTPUT="build/westmount-final.html"

echo "Building $OUTPUT..."

cat > "$OUTPUT" <<'HEADER'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>1006 Westmount Drive — A Record of Process Failure</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400&display=swap" rel="stylesheet">
<style>
HEADER

# Inline CSS
cat css/styles.css >> "$OUTPUT"

echo '</style>' >> "$OUTPUT"
echo '</head>' >> "$OUTPUT"
echo '<body>' >> "$OUTPUT"

# Inline all section partials in order
for f in sections/*.html; do
  echo "" >> "$OUTPUT"
  echo "<!-- ===== $(basename "$f" .html) ===== -->" >> "$OUTPUT"
  cat "$f" >> "$OUTPUT"
done

# GSAP from CDN
cat >> "$OUTPUT" <<'SCRIPTS'

<!-- GSAP + ScrollTrigger -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
SCRIPTS

# Inline JS
cat js/main.js >> "$OUTPUT"

cat >> "$OUTPUT" <<'FOOTER'
</script>
</body>
</html>
FOOTER

SIZE=$(du -h "$OUTPUT" | cut -f1)
echo "Done! → $OUTPUT  ($SIZE)"
echo""
echo "To preview: open $OUTPUT in your browser"
echo "To deploy:  upload $OUTPUT anywhere — it's fully self-contained"
