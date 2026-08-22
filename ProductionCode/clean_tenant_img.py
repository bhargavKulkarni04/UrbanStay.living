from PIL import Image
import numpy as np
from collections import deque

img_path = r"c:\Users\bharg\OneDrive\Desktop\UrbanStay\webdev\assets\Tenant Overview.png"
output_path = r"c:\Users\bharg\OneDrive\Desktop\UrbanStay\webdev\assets\Tenant Overview clean.png"

img = Image.open(img_path).convert("RGBA")
data = np.array(img)

r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
h, w = data.shape[:2]

# If there are any near-white or light pixels outside the phone border, flood fill from the 4 corners to make them transparent
visited = np.zeros((h, w), dtype=bool)
q = deque()

# Add all 4 borders
for x in range(w):
    q.append((x, 0))
    q.append((x, h - 1))
    visited[0, x] = True
    visited[h - 1, x] = True

for y in range(h):
    q.append((0, y))
    q.append((w - 1, y))
    visited[y, 0] = True
    visited[y, w - 1] = True

# Detect background pixels outside the phone bezel
while q:
    x, y = q.popleft()
    # Check if pixel is white, light gray, or transparent
    # Phone bezel is dark / black (R, G, B < 80)
    is_outer_bg = (r[y, x] > 230 and g[y, x] > 230 and b[y, x] > 230) or (a[y, x] < 250)
    if is_outer_bg:
        data[y, x, 3] = 0  # Set alpha to 0
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[ny, nx]:
                visited[ny, nx] = True
                if (r[ny, nx] > 230 and g[ny, nx] > 230 and b[ny, nx] > 230) or (a[ny, nx] < 250):
                    q.append((nx, ny))

cleaned_img = Image.fromarray(data)
cleaned_img.save(output_path, "PNG")
print("Cleaned Tenant Overview saved successfully!")
