from PIL import Image

img = Image.open("inverted-logo-variations.png").convert("RGBA")

data = img.getdata()
new_data = []

for r, g, b, a in data:
    if r < 40 and g < 40 and b < 40:  # threshold for black
        new_data.append((0, 0, 0, 0))  # transparent
    else:
        new_data.append((r, g, b, a))

img.putdata(new_data)
img.save("transparent-inverted-logo-variations-2.png")