import os
from rembg import remove
from PIL import Image

def process_image(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        input_image = Image.open(input_path)
        output_image = remove(input_image)
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        output_image.save(output_path, "PNG")
        print(f"Successfully saved to {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

images = [
    ("images/1.jpeg", "assets/flota/merlo-p40.png"),
    ("images/3.jpeg", "assets/flota/jlg-4017.png"),
    ("images/4.jpeg", "assets/flota/manitou-160atj.png"),
    ("images/7.jpeg", "assets/flota/genie-gs4390.png"),
    ("images/6.jpeg", "assets/flota/genie-z51.png"),
]

for in_p, out_p in images:
    process_image(in_p, out_p)

print("Done.")
