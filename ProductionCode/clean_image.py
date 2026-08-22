from PIL import Image
import numpy as np
from collections import deque

img_path = r"c:\Users\bharg\OneDrive\Desktop\UrbanStay\webdev\assets\Login front hero.png"
output_path = r"c:\Users\bharg\OneDrive\Desktop\UrbanStay\webdev\assets\Login front hero clean.png"

img = Image.open(img_path).convert("RGBA")
data = np.array(img)

r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
h, w = data.shape[:2]

# The checkerboard pattern consists of neutral colors (R~G~B) with values > 180
is_checker = (np.abs(r.astype(int) - g.astype(int)) <= 12) & \
             (np.abs(g.astype(int) - b.astype(int)) <= 12) & \
             (np.abs(r.astype(int) - b.astype(int)) <= 12) & \
             (r >= 180)

visited = np.zeros((h, w), dtype=bool)

# Flood fill from all 4 borders
q = deque()
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

while q:
    x, y = q.popleft()
    if is_checker[y, x]:
        data[y, x, 3] = 0  # Set alpha to 0 (Transparent)
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[ny, nx]:
                visited[ny, nx] = True
                if is_checker[ny, nx]:
                    q.append((nx, ny))

cleaned_img = Image.fromarray(data)
cleaned_img.save(output_path, "PNG")
print("Successfully generated clean transparent image!")
