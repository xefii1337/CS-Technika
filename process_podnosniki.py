import os
from rembg import remove, new_session
from PIL import Image

def process_image(input_path, output_path, session):
    print(f"Processing {input_path}...")
    try:
        input_image = Image.open(input_path)
        output_image = remove(
            input_image,
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=10
        )
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        output_image.save(output_path, "PNG")
        print(f"Successfully saved to {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

session = new_session("isnet-general-use")

# Processing ONLY Podnośniki with high-res images using isnet
images = [
    ("images/4.jpeg", "assets/flota/manitou-160atj.png"),
    ("images/7.jpeg", "assets/flota/genie-gs4390.png"),
    ("images/6.jpeg", "assets/flota/genie-z51.png"),
    ("images/5.jpeg", "assets/flota/genie-s45.png"),
]

for in_p, out_p in images:
    process_image(in_p, out_p, session)

print("Done.")
