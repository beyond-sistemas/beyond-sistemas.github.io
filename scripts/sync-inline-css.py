"""Rebuild the inline <style> block in index.html from css/styles.css."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]
html_path = root / "index.html"
css = (root / "css/styles.css").read_text()

html = html_path.read_text()
start, end = "<!-- inline-css:start -->", "<!-- inline-css:end -->"
if start not in html or end not in html:
    raise SystemExit("inline-css markers missing in index.html")

head, rest = html.split(start, 1)
_, tail = rest.split(end, 1)

block = f"""{start}
  <style>
    @font-face {{ font-family:"Inter"; font-style:normal; font-weight:600 800; font-display:swap; src:url("./assets/fonts/inter-variable.woff2") format("woff2"); }}
    @font-face {{ font-family:"Syne"; font-style:normal; font-weight:600 800; font-display:swap; src:url("./assets/fonts/syne-variable.woff2") format("woff2"); }}
    @font-face {{ font-family:"DM Sans"; font-style:normal; font-weight:400 700; font-display:swap; src:url("./assets/fonts/dm-sans-variable.woff2") format("woff2"); }}
{css}  </style>
  {end}"""
html_path.write_text(head + block + tail)
print("inline CSS sincronizado")
