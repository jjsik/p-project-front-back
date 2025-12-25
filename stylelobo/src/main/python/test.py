import sys
import base64
from io import BytesIO
from PIL import Image

# Base64 인코딩된 이미지 받기
base64_image = sys.argv[1]

# Base64 디코딩 및 이미지 열기
image_data = base64.b64decode(base64_image)
image = Image.open(BytesIO(image_data))

# AI 모델로 예측 수행
color_type = "summer" 

# 결과 출력 (Java에서 읽을 수 있도록)
print(color_type)
